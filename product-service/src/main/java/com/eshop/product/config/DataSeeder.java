package com.eshop.product.config;

import com.eshop.product.model.Product;
import com.eshop.product.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

/**
 * Inserts demo products on first start so the frontend has data to paginate.
 * Runs only when the products table is empty.
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private static final int PRODUCT_COUNT = 120;
    private static final String[] CATEGORIES = {"Electronics", "Books", "Fashion", "Home", "Sports", "Toys"};
    private static final String[] ADJECTIVES = {"Classic", "Smart", "Premium", "Eco", "Compact", "Ultra", "Vintage", "Pro"};
    private static final String[] NOUNS = {"Headphones", "Backpack", "Lamp", "Watch", "Sneakers", "Notebook", "Speaker", "Bottle"};

    private final ProductRepository productRepository;

    @Override
    public void run(String... args) {
        if (productRepository.count() > 0) {
            return;
        }

        Random random = new Random(42);
        List<Product> products = new ArrayList<>();
        for (int i = 1; i <= PRODUCT_COUNT; i++) {
            String name = ADJECTIVES[random.nextInt(ADJECTIVES.length)] + " "
                    + NOUNS[random.nextInt(NOUNS.length)] + " #" + i;
            BigDecimal price = BigDecimal.valueOf(5 + random.nextDouble() * 495).setScale(2, RoundingMode.HALF_UP);
            products.add(Product.builder()
                    .name(name)
                    .description("Demo description for " + name + ".")
                    .price(price)
                    .category(CATEGORIES[random.nextInt(CATEGORIES.length)])
                    .imageUrl("https://picsum.photos/seed/eshop-" + i + "/400/300")
                    .build());
        }
        productRepository.saveAll(products);
        log.info("Seeded {} demo products", PRODUCT_COUNT);
    }
}
