-- ============================================================
-- PawCoupons — pet coupon seed data (verified 2026-11-24)
-- Run AFTER supabase/schema.sql in a NEW Supabase project.
-- 10 US pet stores, 31 coupons (Chewy 4, Petco 3, PetSmart 3,
-- BarkBox 3, PetCareRx 3, 1-800-PetMeds 3, Pet Supplies Plus 3,
-- PetFlow 3, Only Natural Pet 3, Hollywood Feed 3).
-- Sources: DontPayFull first, RetailMeNot / Coupert / CouponDuos /
-- RetailCoupons second. is_verified is FALSE for every coupon:
-- codes were verified from deal sites, not by placing test orders.
--
-- EXPIRY NOTES (read before going live):
-- * NULL expires_at = no expiry published by any source (ongoing
--   program or no date listed). The site shows no expiry line and
--   never auto-hides these — check them again in a few weeks.
-- * PetSmart EARLYBF20 + ROYAL40 expire 2026-11-27 (3 days!) and
--   Petco BLACKFRIDAY20 expires 2026-11-30 — run this file NOW.
-- * SELENA15 (BarkBox): DontPayFull says Dec 24, RetailMeNot says
--   Dec 22 — file uses Dec 24 (freshest DontPayFull crawl).
-- * 1-800-PetMeds BLACKFRIDAY: DontPayFull says Dec 1, DealHack
--   says Nov 28 — file uses Dec 1 (freshest DontPayFull crawl).
-- * BarkBox "Free Toys for a Year": no exact date published;
--   Coupons.com said "Ends in 16 days" on Nov 24, so the file uses
--   2026-12-10 as an APPROXIMATE date — re-check before Dec 10.
-- * BarkBox codes SELENA15 / XL30 were tested on bark.co (the BARK
--   shop), not barkbox.com — their affiliate_url points to bark.co.
-- * Hollywood Feed WELCOME20 / REMINGTON20 are the weakest
--   verification in this file (SimplyCodes says no active codes;
--   CouponDuos lists them as current). Test at checkout first.
-- * Chewy: the old US seed codes are NOT reused here. MORE4LESS
--   (50% off first Autoship) does not exist on any source — dropped.
--   EARLY40 is now EARLY30 (30% off, ends Dec 19). RX20 and
--   WELCOME have no verified expiry, so expires_at is NULL.
-- ============================================================

insert into stores (name, slug, website_url, description) values
  ('Chewy', 'chewy', 'https://www.chewy.com', 'Chewy delivers pet food, treats, toys and pharmacy items for dogs, cats and more, straight to your door.'),
  ('Petco', 'petco', 'https://www.petco.com', 'Petco is a leading US pet retailer for food, supplies, grooming and veterinary care, in store and online.'),
  ('PetSmart', 'petsmart', 'https://www.petsmart.com', 'PetSmart is the largest US pet retailer, with food, toys, grooming salons and in-store vet clinics.'),
  ('BarkBox', 'barkbox', 'https://www.barkbox.com', 'BarkBox is a monthly subscription box of themed toys and treats for dogs, with a shop for extras.'),
  ('PetCareRx', 'petcarerx', 'https://www.petcarerx.com', 'PetCareRx is an online pet pharmacy for prescription and over-the-counter medication, food and supplies.'),
  ('1-800-PetMeds', '1800petmeds', 'https://www.1800petmeds.com', '1-800-PetMeds is America''s largest online pet pharmacy, filling prescriptions for dogs, cats and horses.'),
  ('Pet Supplies Plus', 'pet-supplies-plus', 'https://www.petsuppliesplus.com', 'Pet Supplies Plus is a neighborhood pet store chain with food, supplies, grooming and self-serve dog wash.'),
  ('PetFlow', 'petflow', 'https://www.petflow.com', 'PetFlow is an online pet food store with scheduled Auto-Ship delivery and free shipping over $49.'),
  ('Only Natural Pet', 'onlynaturalpet', 'https://www.onlynaturalpet.com', 'Only Natural Pet sells natural and holistic food, treats and wellness products for dogs and cats.'),
  ('Hollywood Feed', 'hollywoodfeed', 'https://www.hollywoodfeed.com', 'Hollywood Feed is a natural pet food and supply retailer with stores across the US South and Midwest.')
on conflict (slug) do nothing;

insert into coupons (store_id, title, code, description, discount_type, discount_value, affiliate_url, affiliate_network, category, pet_category, tags, expires_at, is_verified, status)
select s.id,
       c.title, c.code, c.description, c.discount_type, c.discount_value,
       c.affiliate_url, c.affiliate_network, c.category, c.pet_category, c.tags,
       c.expires_at::timestamptz, false, 'active'
from stores s
join (values
  -- Chewy (4)
  ('chewy', '20% Off Your First Pharmacy Order', 'RX20', '20% off your first prescription order from Chewy Pharmacy.', 'percent', 20, 'https://www.chewy.com', null, 'Pets', 'pharmacy', ARRAY['New Customers'], null),
  ('chewy', 'Free $20 Gift Card on First Orders Over $49', 'WELCOME', 'Free $20 gift card on your first order of $49 or more. New customers only; some brand exclusions apply.', 'other', null, 'https://www.chewy.com', null, 'Pets', 'food-treats', ARRAY['New Customers'], null),
  ('chewy', '35% Off Your First Autoship Order', null, '35% off your first Autoship order (max $20), then 5% off later deliveries. First-time Autoship only; brand exclusions apply.', 'percent', 35, 'https://www.chewy.com', null, 'Pets', 'food-treats', ARRAY['Autoship Deal', 'New Customers'], null),
  ('chewy', '30% Off Promo Code (Black Friday Early Deal)', 'EARLY30', '30% off your Chewy order. One-time use per person; cannot be combined with other offers.', 'percent', 30, 'https://www.chewy.com', null, 'Pets', 'food-treats', ARRAY[]::text[], '2026-12-19 23:59:59+00'),
  -- Petco (3)
  ('petco', 'Black Friday: 20% Off Sitewide', 'BLACKFRIDAY20', '20% off sitewide on pet supplies and food for Black Friday.', 'percent', 20, 'https://www.petco.com', null, 'Pets', 'food-treats', ARRAY['Sitewide'], '2026-11-30 23:59:59+00'),
  ('petco', '35% Off Your First Autoship Order', 'AUTOSAVE35', '35% off your first repeat-delivery (Autoship) order.', 'percent', 35, 'https://www.petco.com', null, 'Pets', 'food-treats', ARRAY['Autoship Deal'], '2026-12-19 23:59:59+00'),
  ('petco', '$15 Off Your First $49+ Order', 'NEWPETCO15', '$15 off your first Petco order of $49 or more on pet essentials.', 'fixed', 15, 'https://www.petco.com', null, 'Pets', 'food-treats', ARRAY['New Customers'], '2026-12-19 23:59:59+00'),
  -- PetSmart (3)
  ('petsmart', 'Early Black Friday: Extra 20% Off Gifts', 'EARLYBF20', 'Extra 20% off thousands of selected pet gifts, online only.', 'percent', 20, 'https://www.petsmart.com', null, 'Pets', 'toys-gear', ARRAY[]::text[], '2026-11-27 23:59:59+00'),
  ('petsmart', '40% Off Select Royal Canin Dog & Cat Food', 'ROYAL40', '40% off select Royal Canin dog and cat food, online orders with store pickup only.', 'percent', 40, 'https://www.petsmart.com', null, 'Pets', 'food-treats', ARRAY[]::text[], '2026-11-27 23:59:59+00'),
  ('petsmart', '15% Off Storewide', '5544080722', '15% off your purchase sitewide at PetSmart.', 'percent', 15, 'https://www.petsmart.com', null, 'Pets', 'food-treats', ARRAY['Sitewide'], null),
  -- BarkBox (3)
  ('barkbox', 'Free Toys for a Year with New Subscription', null, 'New subscribers get a free extra toy in each monthly box for 12 months. BarkBox ships all subscription plans free.', 'other', null, 'https://www.barkbox.com', null, 'Pets', 'services-boxes', ARRAY['New Customers', 'Free Shipping'], '2026-12-10 23:59:59+00'),
  ('barkbox', '15% Off BARK Orders', 'SELENA15', '15% off all products at BARK (toys, treats, food).', 'percent', 15, 'https://www.bark.co', null, 'Pets', 'toys-gear', ARRAY['Sitewide'], '2026-12-24 23:59:59+00'),
  ('barkbox', '30% Off Extra-Large Toys', 'XL30', '30% off the Extra-Large Toy Collection. One-time, ship-now purchases only; cannot combine with other offers.', 'percent', 30, 'https://www.bark.co', null, 'Pets', 'toys-gear', ARRAY['Free Shipping'], '2026-12-05 23:59:59+00'),
  -- PetCareRx (3)
  ('petcarerx', '25% Off All RX, Food & Supplies', 'CARE25', '25% off prescription meds, food and supplies at PetCareRx. Some manufacturer-restricted brands may be excluded.', 'percent', 25, 'https://www.petcarerx.com', null, 'Pets', 'pharmacy', ARRAY['Sitewide'], null),
  ('petcarerx', '30% Off Sitewide', 'SHOPPER30', '30% off everything at PetCareRx.', 'percent', 30, 'https://www.petcarerx.com', null, 'Pets', 'pharmacy', ARRAY['Sitewide'], '2027-01-02 23:59:59+00'),
  ('petcarerx', '65% Off Annual PetPlus Membership', 'HAPPY65', '65% off the yearly PetPlus membership (wholesale pricing, free shipping, rewards).', 'percent', 65, 'https://www.petcarerx.com', null, 'Pets', 'services-boxes', ARRAY[]::text[], '2027-01-25 23:59:59+00'),
  -- 1-800-PetMeds (3)
  ('1800petmeds', 'Black Friday: 30% Off Sitewide', 'BLACKFRIDAY', 'Black Friday 30% off across the site. Excludes OTC food and Blue Buffalo RX; maximum savings $50 per order.', 'percent', 30, 'https://www.1800petmeds.com', null, 'Pets', 'pharmacy', ARRAY['Sitewide'], '2026-12-01 23:59:59+00'),
  ('1800petmeds', '35% Off Nutrition on First AutoShip Order', 'FOOD35', '35% off pet food and nutrition when you start an AutoShip subscription. First AutoShip order only; max savings $20.', 'percent', 35, 'https://www.1800petmeds.com', null, 'Pets', 'food-treats', ARRAY['Autoship Deal'], '2026-12-31 23:59:59+00'),
  ('1800petmeds', '20% Off Sitewide', 'WELCOME20', '20% off your entire PetMeds order. Maximum discount $30 per order; one-time use per customer.', 'percent', 20, 'https://www.1800petmeds.com', null, 'Pets', 'pharmacy', ARRAY['Sitewide'], '2027-01-01 23:59:59+00'),
  -- Pet Supplies Plus (3)
  ('pet-supplies-plus', 'Black Friday: 10% Off Merchandise', '892V4', '10% off merchandise for the Black Friday promotion.', 'percent', 10, 'https://www.petsuppliesplus.com', null, 'Pets', 'food-treats', ARRAY['Sitewide'], null),
  ('pet-supplies-plus', '20% Off First Pharmacy Order', 'PSP26', '20% off your first pharmacy order at Pet Supplies Plus.', 'percent', 20, 'https://www.petsuppliesplus.com', null, 'Pets', 'pharmacy', ARRAY['New Customers'], null),
  ('pet-supplies-plus', '$5 Off Your First Order', '89749', '$5 off your first order when you sign up for email updates. Minimum $30 order.', 'fixed', 5, 'https://www.petsuppliesplus.com', null, 'Pets', 'food-treats', ARRAY['New Customers'], '2026-11-27 23:59:59+00'),
  -- PetFlow (3)
  ('petflow', 'Up to 35% Off Your First Auto-Ship Order', null, 'Up to 35% off your first Auto-Ship delivery, then 5% off all recurring Auto-Ship deliveries. Discount applies automatically at checkout; free shipping on orders over $49.', 'percent', 35, 'https://www.petflow.com', null, 'Pets', 'food-treats', ARRAY['Autoship Deal', 'New Customers'], null),
  ('petflow', '30% Off Frontline Flea & Tick Prevention', 'STOPBITES', '30% off Frontline flea and tick bite prevention.', 'percent', 30, 'https://www.petflow.com', null, 'Pets', 'pharmacy', ARRAY[]::text[], null),
  ('petflow', '25% Off Wellness Dog & Cat Treats', 'TREATS25OFF', '25% off all Wellness dog and cat treats.', 'percent', 25, 'https://www.petflow.com', null, 'Pets', 'food-treats', ARRAY[]::text[], null),
  -- Only Natural Pet (3)
  ('onlynaturalpet', 'Black Friday: 20% Off Sitewide', 'VIPONP', 'Black Friday promo: 20% off your entire order across the store.', 'percent', 20, 'https://www.onlynaturalpet.com', null, 'Pets', 'food-treats', ARRAY['Sitewide'], '2026-12-01 23:59:59+00'),
  ('onlynaturalpet', '20% Off Your First Order', 'WELCOME', '20% off your initial purchase at Only Natural Pet.', 'percent', 20, 'https://www.onlynaturalpet.com', null, 'Pets', 'food-treats', ARRAY['New Customers', 'Sitewide'], null),
  ('onlynaturalpet', 'Save Up to 40% on Organic Dog Treats', null, 'Sale on organic dog treats, up to 40% off.', 'percent', 40, 'https://www.onlynaturalpet.com', null, 'Pets', 'food-treats', ARRAY[]::text[], '2026-11-27 23:59:59+00'),
  -- Hollywood Feed (3)
  ('hollywoodfeed', '20% Off Sitewide', 'WELCOME20', '20% off at Hollywood Feed. Applies to one regular-priced item; code is updated weekly.', 'percent', 20, 'https://www.hollywoodfeed.com', null, 'Pets', 'food-treats', ARRAY['Sitewide', 'New Customers'], null),
  ('hollywoodfeed', '20% Off Sitewide', 'REMINGTON20', '20% off your Hollywood Feed order.', 'percent', 20, 'https://www.hollywoodfeed.com', null, 'Pets', 'food-treats', ARRAY['Sitewide'], null),
  ('hollywoodfeed', 'Black Friday Sale: Save Up to 50% Off', null, 'Hollywood Feed Black Friday deals, up to 50% off.', 'percent', 50, 'https://www.hollywoodfeed.com', null, 'Pets', 'food-treats', ARRAY[]::text[], null)
) as c(slug, title, code, description, discount_type, discount_value, affiliate_url, affiliate_network, category, pet_category, tags, expires_at)
  on s.slug = c.slug;
