module 0x0::product_registry {
    use std::signer;
    use std::vector;

    // Struct representing a product
    struct Product has key {
        id: vector<u8>,
        name: vector<u8>,
        origin: vector<u8>,
        manufacturer: address,
        created_at: u64,
        updates: vector<Update>,
    }

    // Struct for product journey updates
    struct Update has copy, drop, store {
        actor: address,
        timestamp: u64,
        location: vector<u8>,
        status: vector<u8>,
    }

    // Resource for storing products on-chain
    resource struct ProductStore {
        products: vector<Product>
    }

    // Initialize store
    public fun init(owner: &signer) {
        move_to(owner, ProductStore { products: vector::empty() });
    }

    // Register a new product
    public fun register_product(
        owner: &signer,
        id: vector<u8>,
        name: vector<u8>,
        origin: vector<u8>,
        created_at: u64
    ) {
        let addr = signer::address_of(owner);
        let product = Product {
            id,
            name,
            origin,
            manufacturer: addr,
            created_at,
            updates: vector::empty(),
        };
        let store = borrow_global_mut<ProductStore>(addr);
        vector::push_back(&mut store.products, product);
    }

    // Add a checkpoint/update
    public fun add_update(
        owner: &signer,
        product_id: &vector<u8>,
        timestamp: u64,
        location: vector<u8>,
        status: vector<u8>
    ) {
        let addr = signer::address_of(owner);
        let store = borrow_global_mut<ProductStore>(addr);
        let len = vector::length(&store.products);
        let mut i = 0;
        while (i < len) {
            let p = &mut vector::borrow_mut(&mut store.products, i);
            if (vector::equals(&p.id, product_id)) {
                let update = Update { actor: addr, timestamp, location, status };
                vector::push_back(&mut p.updates, update);
                return;
            };
            i = i + 1;
        };
        abort 1;
    }
}
