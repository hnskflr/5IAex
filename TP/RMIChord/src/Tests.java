
/**
 * CHORD DHT Unit tests
 */

import org.junit.jupiter.api.*;
import static org.junit.jupiter.api.Assertions.*;

import java.lang.reflect.Field;
import java.rmi.NotBoundException;
import java.rmi.RemoteException;
import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;
import java.util.Map;

/**
 * JUnit Test Class
 * 
 * @author mdw
 *
 */
public class Tests {
	private INode node0, node1, node4, node7;

	@BeforeEach
	public void setup() throws RemoteException, NotBoundException, NoSuchFieldException, SecurityException,
			IllegalArgumentException, IllegalAccessException {
		Registry registry = LocateRegistry.getRegistry();
		registry.list(); // asserts that registry is working

		node0 = new Node(0);
		registry.rebind("NodeDHT", node0);

		// bootstrap test: first both the predecessor and the successor should
		// point to the single master-node and then there should be just a single
		// peer
		{
			final Field predField = Node.class.getDeclaredField("pred");
			predField.setAccessible(true); // ignore visibility "private"
			assertEquals((INode) predField.get(node0), node0);
			final Field succField = Node.class.getDeclaredField("succ");
			succField.setAccessible(true); // ignore visibility "private"
			assertEquals((INode) succField.get(node0), node0);

			final Field peersField = Node.class.getDeclaredField("peers");
			peersField.setAccessible(true); // ignore visibility "private"
			@SuppressWarnings("unchecked")
			final Map<Integer, INode> peers = (Map<Integer, INode>) peersField.get(node0);

			assertEquals(peers.size(), 1);
			assertEquals(peers.get(0).getId(), node0.getId());

			assertEquals(node0.lookupPeers(0, 0), null); // no finger-table entry
			assertEquals(node0.lookupPeers(0, 1), null);
			assertEquals(node0.lookupPeers(0, 2), null);
		}

		node1 = new Node(1);
		node4 = new Node(4);
		node7 = new Node(7);

		((INode) registry.lookup("NodeDHT")).register(node1);
		((INode) registry.lookup("NodeDHT")).register(node4);
		((INode) registry.lookup("NodeDHT")).register(node7);
	}

	@Test
	public void reRegisterExistingNode() throws RemoteException, NotBoundException {
		final INode node4 = new Node(4);
		final Registry registry = LocateRegistry.getRegistry();

		// already registered
		assertThrows(RemoteException.class, () -> ((INode) registry.lookup("NodeDHT")).register(node4));
	}

	@Test
	public void verifyPredecessorSuccessor() throws NoSuchFieldException, SecurityException, RemoteException,
			IllegalArgumentException, IllegalAccessException {
		final Field predField = Node.class.getDeclaredField("pred");
		predField.setAccessible(true); // ignore "private"
		final Field succField = Node.class.getDeclaredField("succ");
		succField.setAccessible(true); // ignore "private"

		// Node 0
		assertEquals(((INode) predField.get(node0)).getId(), 7);
		assertEquals(((INode) succField.get(node0)).getId(), 1);
		// Node 1
		assertEquals(((INode) predField.get(node1)).getId(), 0);
		assertEquals(((INode) succField.get(node1)).getId(), 4);
		// Node 4
		assertEquals(((INode) predField.get(node4)).getId(), 1);
		assertEquals(((INode) succField.get(node4)).getId(), 7);
		// Node 7
		assertEquals(((INode) predField.get(node7)).getId(), 4);
		assertEquals(((INode) succField.get(node7)).getId(), 0);
	}

	@Test
	public void verifyPeers() throws IllegalArgumentException, IllegalAccessException, NoSuchFieldException,
			SecurityException, RemoteException {
		final Field peersField = Node.class.getDeclaredField("peers");
		peersField.setAccessible(true); // ignore visibility "private"
		@SuppressWarnings("unchecked")
		final Map<Integer, INode> peers = (Map<Integer, INode>) peersField.get(node0);

		assertEquals(peers.get(0).getId(), node0.getId());
		assertEquals(peers.get(1).getId(), node1.getId());
		assertEquals(peers.get(4).getId(), node4.getId());
		assertEquals(peers.get(7).getId(), node7.getId());
	}

	@Test
	public void verifyFingertable() throws RemoteException {
		// Node 0
		assertEquals(node0.lookupPeers(0, 0).getId(), 1); // 0 + 2^0 = 1
		assertEquals(node0.lookupPeers(0, 1).getId(), 4); // 0 + 2^1 = 4
		assertEquals(node0.lookupPeers(0, 2).getId(), 4); // 0 + 2^2 = 4
		// Node 1
		assertEquals(node0.lookupPeers(1, 0).getId(), 4); // 1 + 2^0 = 4
		assertEquals(node0.lookupPeers(1, 1).getId(), 4); // 1 + 2^1 = 4
		assertEquals(node0.lookupPeers(1, 2).getId(), 7); // 1 + 2^2 = 7
		// Node 4
		assertEquals(node0.lookupPeers(4, 0).getId(), 7); // 4 + 2^0 = 7
		assertEquals(node0.lookupPeers(4, 1).getId(), 7); // 4 + 2^1 = 7
		assertEquals(node0.lookupPeers(4, 2).getId(), 0); // 4 + 2^2 = 0
		// Node 7
		assertEquals(node0.lookupPeers(7, 0).getId(), 0); // 7 + 2^0 = 0
		assertEquals(node0.lookupPeers(7, 1).getId(), 1); // 7 + 2^1 = 1
		assertEquals(node0.lookupPeers(7, 2).getId(), 4); // 7 + 2^2 = 4
	}

	@Test
	public void validLookupKeys() throws RemoteException {
		// only positive key values possible
		node0.lookupEntity(0, null);
		assertThrows(RemoteException.class, () -> node0.lookupEntity(-1, null));
		node1.lookupEntity(0, null);
		assertThrows(RemoteException.class, () -> node1.lookupEntity(-1, null));
		node4.lookupEntity(0, null);
		assertThrows(RemoteException.class, () -> node4.lookupEntity(-1, null));
		node7.lookupEntity(0, null);
		assertThrows(RemoteException.class, () -> node7.lookupEntity(-1, null));
	}

	private void verifyKeys(long key, INode node) throws RemoteException {
		final int replyNodeId = node.awaitReply().getId();
		if (key % 8 == 0) // key <= 0
			assertEquals(replyNodeId, 0);
		else if (key % 8 == 1) // 0 < key <= 1
			assertEquals(replyNodeId, 1);
		else if (key % 8 >= 2 && key % 8 <= 4) // 1 < key <= 4
			assertEquals(replyNodeId, 4);
		else // 4 < key <= 7
			assertEquals(replyNodeId, 7);
	}

	@Test
	public void lookupKeys() throws RemoteException {
		// Node 0
		for (long key = 0; key <= 16; ++key) {
			node0.lookupEntity(key, null);
			verifyKeys(key, node0);
			node0.lookupEntity(key, node1);
			verifyKeys(key, node1);
		}
		// Node 1
		for (long key = 0; key <= 16; ++key) {
			node1.lookupEntity(key, null);
			verifyKeys(key, node1);
			node1.lookupEntity(key, node0);
			verifyKeys(key, node0);
		}
		// Node 4
		for (long key = 0; key <= 16; ++key) {
			node4.lookupEntity(key, null);
			verifyKeys(key, node4);
			node4.lookupEntity(key, node7);
			verifyKeys(key, node7);
		}
		// Node 7
		for (long key = 0; key <= 16; ++key) {
			node7.lookupEntity(key, null);
			verifyKeys(key, node7);
			node7.lookupEntity(key, node0);
			verifyKeys(key, node0);
		}
	}
}
