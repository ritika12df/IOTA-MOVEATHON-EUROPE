// Copyright (c) Mysten Labs, Inc.
// Modifications Copyright (c) 2024 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0

/// This example illustrates how to use the `Token` without a `TokenPolicy`. And
/// only rely on `TreasuryCap` for minting and burning tokens.
module trackit::product_registry {
    use iota::tx_context::{TxContext, sender};
    use iota::coin::{Self, TreasuryCap, Coin};
    use iota::balance::{Self, Balance};
    use iota::token::{Self, Token};
    use iota::iota::IOTA;
    use iota::object::{Self, UID};

    /// Error code for incorrect amount.
    const EIncorrectAmount: u64 = 0;
    /// Trying to claim a free product without enough points.
    /// Or trying to transfer but not enough points to pay the commission.
    const ENotEnoughPoints: u64 = 1;

    /// 10 IOTA for a product.
    const PRODUCT_PRICE: u64 = 10_000_000_000;

    /// OTW for the Token.
    public struct PRODUCT_REGISTRY has drop {}

    /// The token type for products.
    public struct PRODUCT has drop {}

    /// The registry that manages products and allows to buy a product if the customer
    /// has 10 PRODUCT_REGISTRY points.
    public struct ProductRegistry has key {
        id: UID,
        /// The treasury cap for the `PRODUCT_REGISTRY` points.
        product_points: TreasuryCap<PRODUCT_REGISTRY>,
        /// The IOTA balance of the registry; the registry can sell products for IOTA.
        balance: Balance<IOTA>,
    }

    /// Event marking that a Product was purchased; transaction sender serves as
    /// the customer ID.
    public struct ProductPurchased has copy, store, drop {}

    // Create and share the `ProductRegistry` object.
    fun init(otw: PRODUCT_REGISTRY, ctx: &mut TxContext) {
        let (product_points, metadata) = coin::create_currency(
            otw, 0, b"PRODUCT", b"Product Point",
            b"Buy 4 products and get 1 free",
            std::option::none(),
            ctx
        );

        iota::transfer::public_freeze_object(metadata);
        iota::transfer::share_object(ProductRegistry {
            product_points,
            id: object::new(ctx),
            balance: balance::zero(),
        });
    }

    /// Buy a product from the registry. Emitted event is tracked by the real registry
    /// and the customer gets a free product after 4 purchases.
    public fun buy_product(app: &mut ProductRegistry, payment: Coin<IOTA>, ctx: &mut TxContext) {
        // Check if the customer has enough IOTA to pay for the product.
        assert!(coin::value(&payment) > PRODUCT_PRICE, EIncorrectAmount);

        let token = token::mint(&mut app.product_points, 1, ctx);
        let request = token::transfer(token, sender(ctx), ctx);

        token::confirm_with_treasury_cap(&mut app.product_points, request, ctx);
        coin::put(&mut app.balance, payment);
        iota::event::emit(ProductPurchased {})
    }

    /// Claim a free product from the registry. Emitted event is tracked by the real
    /// registry and the customer gets a free product after 4 purchases. The
    /// `PRODUCT_REGISTRY` tokens are spent.
    public fun claim_free(app: &mut ProductRegistry, points: Token<PRODUCT_REGISTRY>, ctx: &mut TxContext) {
        // Check if the customer has enough `PRODUCT` points to claim a free one.
        assert!(token::value(&points) == 4, EIncorrectAmount);

        // While you could use `burn`, spend illustrates another way of doing this
        let request = token::spend(points, ctx);
        token::confirm_with_treasury_cap(&mut app.product_points, request, ctx);
        iota::event::emit(ProductPurchased {})
    }

    /// you will allow transfer of `PRODUCT_REGISTRY` points to other customers but you charge 1
    /// `PRODUCT_REGISTRY` point for the transfer.
    public fun transfer(
        app: &mut ProductRegistry,
        mut points: Token<PRODUCT_REGISTRY>,
        recipient: address,
        ctx: &mut TxContext
    ) {
        assert!(token::value(&points) > 1, ENotEnoughPoints);
        let commission = token::split(&mut points, 1, ctx);
        let request = token::transfer(points, recipient, ctx);

        token::confirm_with_treasury_cap(&mut app.product_points, request, ctx);
        token::burn(&mut app.product_points, commission);
    }
}