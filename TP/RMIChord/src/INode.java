import java.rmi.Remote;
import java.rmi.RemoteException;

/**
 * Interface for a node in a CHORD DHT
 *
 * @author csag9963
 *
 */
public interface INode extends Remote
{
	/**
	 * Gets the ID of a node
	 * @return ID
	 * @throws RemoteException
	 */
	int getId() throws RemoteException;

	/**
	 * Lookup for a node through the peers structure (should only be called on
	 * node 0). This method acts as a helper for building the finger table within
	 * "createFingertable" (please have also a look at the explanations there).
	 * @param id ID
	 * @param i Start position 2^i
	 * @return Node object from the closest successor of id ID, "null" if there
	 *   exists only the master-node
	 * @throws RemoteException
	 */
	INode lookupPeers(int id, int i) throws RemoteException;

	/**
	 * Registers a node (should only be called on node 0)<br>
	 * This does:<br>
	 * <ul>
	 * <li>Adds the node to the internal peers collection of the master-node
	 *  (which contains all nodes)</li>
	 * <li>Calls the "setPredSucc" method to let all other nodes know about their
	 *   predecessor and successor</li>
	 * <li>Calls the "createFingertable" method to set-up the finger table on each
	 *   peer</li>
	 * </ul>
	 * The first time we may skip the neighbour lookups and the finger table
	 * creation. 
	 * @param n node
	 * @throws RemoteException
	 */
	void register(INode n) throws RemoteException;

	/**
	 * Sets the predecessor and successor on the called node
	 * @param pred Predecessor node
	 * @param succ Successor node
	 * @throws RemoteException
	 */
	void setPredSucc(INode pred, INode succ) throws RemoteException;

	/**
	 * Creates a finger table of length M on the callee node<br>
	 * <p><em>Attention:</em> The finger tables are NEVER self-referencing, so when
	 * a certain node does not exist, its closest successor which is NOT the node
	 * itself has to be chosen. This also implies that a finger table for a chord
	 * with a single node may not be built!</p>
	 * @param node0 master-node
	 * @throws RemoteException
	 */
	void createFingertable(INode node0) throws RemoteException;

	/**
	 * Determines the place for an entity object in the CHORD DHT
	 * @param key The entity object's key which must be >= 0. The entity object's
	 * target will be the node with the number (key mod 2^M) or alternatively its
	 * closest active successor.
	 * @param replyTo The node to which the reply should be returned ("null" = the callee)
	 * @throws RemoteException
	 */
	void lookupEntity(long key, INode replyTo) throws RemoteException;

	/**
	 * Callback of "lookupEntity" invoked on the node "replyTo".
	 * @param key The entity object's key which must be >= 0.
	 * @param node The entity object's target
	 * @throws RemoteException
	 */
	void replyLookupEntity(long key, INode node) throws RemoteException;
	
	/**
	 * This call blocks until we reach the end of the replyLookupEntity()
	 * call.
	 * @return The target node (id >= (key mod 2^M))
	 * @throws RemoteException
	 */
	INode awaitReply() throws RemoteException;
}
