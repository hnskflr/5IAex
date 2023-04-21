import java.rmi.NotBoundException;
import java.rmi.RemoteException;
import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;
import java.rmi.server.UnicastRemoteObject;

import java.util.Map;
import java.util.HashMap;
import java.util.Scanner;

/**
 * Node implementation on a CHORD DHT
 * 
 * @author csag9963
 *
 */
public class Node extends UnicastRemoteObject implements INode
{
    /**
     * 
     */
    private static final long serialVersionUID = 4765286625757924060L;

    /** Bit length for DHT (nodes can therefore be labeled from 0 to (2^M)-1 */
    public static final int M = 3;
    /** Node limit ((2^M) */
    public static final int NODES_MAX = 1 << M;

    /** ID from node */
    private int id;
    /** Peers (only on the master-node) */
    private Map<Integer,INode> peers = new HashMap<Integer,INode>();
    /** Predecessor (all nodes) */
    private INode pred = this;
    /** Successor (all nodes) */
    private INode succ = this;
    /** Finger table (all nodes) */
    private INode fingerTable[] = new INode[M];

    /** Reply node (needed for awaitReply()) */
    private INode replyNode;

    /**
     * Constructor with node ID as parameter
     * @param id Node ID
     * @throws RemoteException
     */
    protected Node(final int id) throws RemoteException {
        if (id < 0)
            throw new RemoteException("Node: id < 0 not allowed!");

        this.id = id;
        if (id == 0)
            register(this); // self-registration
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = super.hashCode();
        result = prime * result + id;
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (!super.equals(obj))
            return false;
        if (getClass() != obj.getClass())
            return false;

        final Node other = (Node) obj;
        if (id != other.id)
            return false;
        return true;
    }

    @Override
    public String toString() {
        return "Node: " + id;
    }

    @Override
    public int getId() throws RemoteException {
        return id;
    }

    @Override
    public INode lookupPeers(final int id, final int i) throws RemoteException {
        if (this.id != 0)
            throw new RemoteException("lookupNode0: This can only be called on node 0!");

        INode n = null;
        synchronized (peers) {
            // TODO
        }
        return n;
    }

    @Override
    public void register(final INode n) throws RemoteException {
        if (id != 0)
            throw new RemoteException("register: This can only be called on node 0!");
        if (n == null)
            throw new RemoteException("register: node == null!");

        synchronized (peers) {
            if (peers.containsKey(n.getId()))
                throw new RemoteException("register: already registered!");
            peers.put(n.getId(), n);

            // The first time we skip the neighbour lookup and the finger table
            // creation
            if (n.getId() == 0)
                return;

            for (INode n2: peers.values()) {
                INode pred = null, succ = null;

                // TODO

                n2.setPredSucc(pred, succ);
            }
        }

        // This needs to be called outside of the "peers" monitor, to not stall
        // inbound lookupPeers() calls.
        createFingertable(this);
    }

    @Override
    public void setPredSucc(final INode pred, final INode succ) throws RemoteException {
        if (pred == null)
            throw new RemoteException("setPredSucc: pred == null!");
        if (succ == null)
            throw new RemoteException("setPredSucc: succ == null!");

        synchronized (peers) {
            this.pred = pred;
            this.succ = succ;
        }
    }

    @Override
    public void createFingertable(final INode node0) throws RemoteException {
        if (node0 == null)
            throw new RemoteException("createFingertable: node0 == null!");
        if (node0.getId() != 0)
            throw new RemoteException("createFingertable: node0 has to be an instance of node 0!");

        synchronized (fingerTable) {
            for (int i = 0; i < M; i++) {
                fingerTable[i] = node0.lookupPeers(id, i);
            }

            // Propagate the finger table. But be aware: when the target's node
            // ID is smaller than our actual ID we have a cyclic overflow
            // -> this means we are finished with the creation on this node!
            if (id < succ.getId())
                succ.createFingertable(node0);
        }
    }

    @Override
    public void lookupEntity(final long key, final INode replyTo)
        throws RemoteException {
        if (key < 0)
            throw new RemoteException("lookupEntity: key < 0 !");

        new Thread() {
            @Override
            public void run() {
                try {
                    // The replier is passed as an argument, otherwise is is the callee
                    final INode locReplyTo = replyTo != null ? replyTo : Node.this;

                    // (1 << M) does not exceed type int, hence the modulo result
                    // fits into it 
                    int targetId = (int)(key % NODES_MAX);
                    System.out.println("Node " + id + " got request for key "
                            + key + " (mod 2^M = " + targetId + ")");

                    if (id == targetId
                            || /* TODO */
                            || /* TODO */) {
                        /*
                         * We have arrived if
                         * - the current node id = key
                         * - ... TODO
                         * - ... TODO
                         */
                        locReplyTo.replyLookupEntity(key, Node.this);
                    } else {
                        // Look for the closest node which is
                        // 2^((key - current node id + 2^M) % 2^M)

                        synchronized (fingerTable) {
                            // TODO
                        }
                    }
                } catch (RemoteException e) {
                    System.err.println("Connection problem: " + e.getMessage());
                }
            }
        }.start();
    }

    @Override
    public void replyLookupEntity(final long key, final INode node)
        throws RemoteException {
        System.out.println("Node " + node.getId() + " replied to key " + key);

        synchronized (this) {
            this.replyNode = node;
            this.notify();
        }
    }

    @Override
    public synchronized INode awaitReply() throws RemoteException {
        try {
            this.wait();
            return this.replyNode;
        } catch (InterruptedException e) {
            System.err.println("Interrupted when waiting for message reply!");
            throw new RemoteException(e.getMessage());
        }
    }

    /**
     * @param args
     */
    public static void main(String[] args) {
        if (args.length != 1) {
            System.err.println("Illegal parameters! The only parameter which is allowed has to match the node's ID.");
            System.exit(1);
        }

        int id = -1;
        try {
            id = Integer.parseInt(args[0]);
            if ((id < 0) || (id > NODES_MAX-1))
                throw new NumberFormatException();
        } catch (NumberFormatException e) {
            System.err.println("The ID should be a positive integer between [0; "
                    + (NODES_MAX-1) + "]!");
            System.exit(2);
        }

        try {
            Node n = new Node(id);

            Registry registry = LocateRegistry.getRegistry();
            if (id == 0)
                registry.rebind("NodeDHT", n);
            else
                ((INode)registry.lookup("NodeDHT")).register(n);

            // Messenger

            System.out.println(" * * * CORD - DISTRIBUTED HASH TABLE * * * ");
            System.out.println("------------------------------------------\n");

            Scanner s = new Scanner(System.in);

            while (true) {
                // Read in key for lookup
                long key = -1;
                do {
                    System.out.print(n + " - Your lookup key: ");
                    try {
                        key = Long.parseLong(s.nextLine());
                        if (key < 0)
                            throw new NumberFormatException();
                    } catch (NumberFormatException e) {
                        System.err.println("The key should be a positive integer from [0; MAX_LONG]!");
                    }
                } while (key < 0);

                // Send lookup request
                n.lookupEntity(key, null);
                n.awaitReply();
            }
        } catch (RemoteException e) {
            System.err.println("Connection problem: " + e.getMessage());
            System.exit(4);
        } catch (NotBoundException e) {
            System.err.println("Node 0 not started!");
            System.exit(3);
        }
    }
}
