import type { FaqItem } from "./faq";

export interface GuideSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface Guide {
  slug: string;
  title: string;
  description: string;
  updatedAt: string;
  /** Store this guide is about (its live coupons are shown on the page). */
  storeSlug?: string;
  /** Pet category whose live coupons are shown under this guide. */
  petCategory?: string;
  /** Illustration image path, e.g. "/guides/dog-and-cat-food-by-age.webp". */
  image?: string;
  /** Slugs of other guides this one genuinely relates to (by content, not by default). */
  relatedGuides?: string[];
  /** Pet category slugs this guide genuinely covers. */
  relatedCategories?: string[];
  intro: string[];
  sections: GuideSection[];
  faqs: FaqItem[];
}

export const GUIDES: Guide[] = [
  {
    slug: "black-friday-shopping-tips-2026",
    title: "Black Friday Pet Shopping Tips 2026: Don't Pay Full Price — Check for a Promo Code First",
    description:
      "Black Friday 2026 tips for pet supplies: check for a promo code before you pay, stack sale prices with codes and Autoship, watch prescription exclusions, and mind free-shipping thresholds on heavy litter and food — with live codes for Chewy, Petco, PetSmart, BarkBox and more.",
    updatedAt: "2026-11-25",
    relatedGuides: [
      "how-to-save-at-chewy",
      "how-to-save-at-petco",
      "how-to-save-on-pet-pharmacy",
    ],
    relatedCategories: ["food-treats", "pharmacy", "litter-cleaning"],
    intro: [
      "Your dog doesn't care about Black Friday — but your wallet will notice it when the kibble bag, the flea treatment and the litter all run out in the same week. Black Friday 2026 lands on November 27, with Cyber Monday on November 30, and pet stores save their deepest food, pharmacy and toy deals for exactly that stretch.",
      "Think of this guide as the pre-checkout sniff test for pet owners: open your pet store's page on PawCoupons, grab the live code that fits your cart — Autoship food, a pharmacy refill, a first BarkBox — and only then pay. Thirty seconds at the promo box can cover a bag of treats, and the codes on the store page are the ones still live right now.",
    ],
    sections: [
      {
        heading: "Find a code before you check out — every time",
        paragraphs: [
          "Do this for every order: find the store on PawCoupons first, copy the live code, shop as normal, then paste the code in the promo-code box before you pay. Check that the total changed — if it did not, read the code's terms for a minimum spend or excluded brands, and try the next live code on the store page.",
          "Codes change daily during Black Friday week, and the best ones can end before Friday itself. Check the live store page right before checkout, not a screenshot or a code from last week.",
        ],
        bullets: [
          "Check the store's live codes on PawCoupons before you shop",
          "Paste the code before you pay — most stores will not apply it afterwards",
          "If no code works, use 'Report broken code' so PawCoupons can check it",
        ],
      },
      {
        heading: "Compare the code with the Autoship offer",
        paragraphs: [
          "For food, treats and litter you buy every month, the first Autoship order often beats a one-off promo code — Chewy, Petco and 1-800-PetMeds all run deep first-Autoship discounts. But a Black Friday code can beat Autoship on a single big order, so compare the two before you check out and pick the bigger saving.",
          "After the first order, Autoship keeps saving a smaller percentage on every delivery, and it makes it easy to clear free-shipping thresholds without thinking about it.",
        ],
      },
      {
        heading: "Watch out for prescription exclusions",
        paragraphs: [
          "Sitewide codes at pet pharmacies often exclude prescription medicine and a few restricted brands. If your cart is mostly flea, tick or heartworm medication, check the code's terms first — a pharmacy-specific code usually saves more than a sitewide one that excludes Rx items.",
          "The same applies to some premium food brands. Read the exclusions before you celebrate the discount.",
        ],
      },
      {
        heading: "Heavy bags: check free shipping before the code",
        paragraphs: [
          "Litter, large food bags and crates are heavy, and delivery can cost more than the code saves. Check the free-shipping threshold first — Chewy ships free over $49, and first-time customers need less. If your cart is just short, adding a small toy or treat is usually cheaper than paying for shipping.",
        ],
      },
      {
        heading: "Timing: don't wait for Friday if the code is good now",
        paragraphs: [
          "Early Black Friday sales start one to two weeks before Friday, November 27, and the best codes often appear in that early window. If you see a code you like, use it — Black Friday codes can end at midnight with no warning. Cyber Monday, November 30, is usually the best day for online-only codes.",
        ],
      },
      {
        heading: "Where to look first, by what you're buying",
        paragraphs: [
          "Food and treats: Chewy, Petco and PetSmart — compare the live code with the first Autoship offer. Pharmacy: Chewy Pharmacy, PetCareRx and 1-800-PetMeds — compare the pharmacy code with the sitewide one. Toys and gear: PetSmart and BarkBox. Subscription boxes: BarkBox — look for first-box offers. Litter and cleaning: Chewy and Petco — check free-shipping thresholds first.",
          "Every store above has a live code page on PawCoupons — open the store page from the guide's live offers or the All Stores page and check the codes there before you check out.",
        ],
      },
    ],
    faqs: [
      {
        question: "When is Black Friday 2026?",
        answer:
          "Friday, November 27, 2026 — and the pet deals don't wait for that morning. Chewy, Petco and PetSmart usually open their early Black Friday pet sales a week or two ahead, then Cyber Monday on November 30 brings the online-only codes for toys, beds and first boxes.",
      },
      {
        question: "Do I still need a promo code if the item is already on sale?",
        answer:
          "Yes, and for pet food it's often where the real saving hides. A bag of kibble already marked down can still take a promo code on top, and that extra cut matters when you're buying the same food every month. Just check the live code on PawCoupons first — some sale items and premium brands are excluded, so pick the code that actually applies to your cart.",
      },
      {
        question: "Can I use more than one promo code on one order?",
        answer:
          "Almost never — pet stores take one code per checkout, whether it's Chewy, Petco or a pharmacy like PetCareRx. The smarter move is to compare: a 35% first-Autoship code usually beats a small sitewide code on a food order, while a pharmacy code usually beats both on flea and tick medicine. Pick the winner for that cart and save the other code for your next refill.",
      },
      {
        question: "What if the code doesn't work?",
        answer:
          "Start with the three usual suspects for pet carts: the code is for first orders or first Autoship only, your cart is under the minimum spend, or the item is prescription medicine or an excluded premium brand. If none of those fit, try the next live code on the store page — and tap 'Report broken code' so we can check it and pull it if it's dead.",
      },
      {
        question: "Do Black Friday promo codes expire quickly?",
        answer:
          "They can vanish overnight, especially the ones tied to a single weekend. A code that works on a Tuesday night can be gone by Friday morning, and the deepest toy and first-box offers often end when Cyber Monday does. PawCoupons drops expired codes from the store pages automatically, so what you see there is still in date — but if a code looks good for your pet's next food or medicine refill, use it rather than saving it for later.",
      },
    ],
  },
  {
    slug: "how-to-save-at-chewy",
    title: "How to Save at Chewy in 2026: One Autoship Cart for Food, Pharmacy and Litter",
    description:
      "Save at Chewy by running one Autoship cart for a multi-pet household: time food, litter and pharmacy refills together, pick between the first-order gift card and the first-Autoship discount, and trial new food risk-free — with live Chewy codes on PawCoupons.",
    updatedAt: "2026-11-25",
    storeSlug: "chewy",
    relatedGuides: [
      "how-to-save-on-pet-pharmacy",
      "how-to-save-at-petco",
      "black-friday-shopping-tips-2026",
    ],
    relatedCategories: ["food-treats", "pharmacy", "litter-cleaning"],
    intro: [
      "If you share your home with a dog who eats like a teenager and a cat who only eats one flavour, Chewy stops being a shop and becomes a schedule. The saving isn't in one clever code — it's in getting the food, the litter and the flea treatment to arrive in the same box, on the week you actually run out.",
      "This guide is built around that one-cart idea. Set up Autoship around each pet's real usage, choose the right first-order deal for the size of your cart, and use Chewy's long returns window to trial a new food without betting a full bag on it. The live Chewy codes on PawCoupons are the starting point — check them before you order, because the best deal changes with your cart.",
    ],
    sections: [
      {
        heading: "Run one Autoship cart, timed to each pet",
        paragraphs: [
          "Don't put everything on the same delivery date. A large dog can finish a bag of kibble in four weeks while a cat's litter lasts two, and flea and tick medicine runs on a strict monthly clock. Give each item its own Autoship frequency — food every four weeks, litter every two, medicine monthly — and let Chewy deliver them together when the dates line up.",
          "That timing is where the money is. A cart that clears the free-shipping threshold in one delivery beats three small orders that each miss it, and a recurring cart means you stop paying full price for an emergency bag at the last minute because the food ran out on a Sunday.",
        ],
      },
      {
        heading: "First order: gift card, Autoship discount or early code — pick one",
        paragraphs: [
          "Chewy's first-order deals don't stack, so the choice depends on your cart. A first order over $49 can earn a $20 gift card, while a first Autoship order gets 35% off up to $20 — on a small first cart the gift card often wins, on a big first food order the Autoship percentage usually wins. Early seasonal codes, like the 30% Black Friday early deal, are a third option for a one-off order that you don't want on Autoship.",
          "Do the quick maths before you check out: work out the final price after each deal, not the headline percentage. Then check the live Chewy page on PawCoupons, because which deal is running — and whether it excludes your brand — changes week to week.",
        ],
      },
      {
        heading: "Put the pharmacy refill in the same cart, but read its rules first",
        paragraphs: [
          "Chewy Pharmacy runs its own first-order discount — 20% off a first prescription order — and it plays by different rules from a food code. A prescription needs your vet's approval, so allow extra days on the first order, and don't count on a sitewide code covering it: most sitewide codes exclude prescription medicine.",
          "Once the prescription is approved, set the refill on Autoship to match the dose schedule and skip a delivery if you still have doses left. Never stockpile medicine past its expiry date just because a code is running.",
        ],
      },
      {
        heading: "Trial a new food without betting a full bag on it",
        paragraphs: [
          "Chewy gives you 365 days to return an item for free, and that changes how you should try a new food. Buy the smallest bag first, mix it with the old food over a week or so, and watch whether your pet actually eats it — a 35% discount on a bag your dog refuses is still money wasted.",
          "If the trial works, move the winning food onto Autoship at the frequency your pet actually eats it. If it doesn't, return it and try the next brand with the next live code, instead of forcing a pet through a bag they hate.",
        ],
      },
      {
        heading: "When to check Petco or PetSmart instead",
        paragraphs: [
          "Chewy usually wins on a recurring food-and-pharmacy cart, but it isn't always the cheapest for a single toy, bed or crate — especially when Petco or PetSmart run a pickup or in-store deal on that exact item. Before a one-off purchase, compare the final price on Chewy with the same item at Petco, including delivery.",
          "For the pharmacy side of the same cart, compare Chewy Pharmacy with PetCareRx and 1-800-PetMeds the same way — our pet pharmacy guide walks through that comparison, and the live codes for all three are on their PawCoupons store pages.",
        ],
      },
    ],
    faqs: [
      {
        question: "Should I put everything on Autoship, or just the food?",
        answer:
          "Put the things you buy on a fixed schedule on Autoship — food, litter and monthly medicine — and keep toys, beds and treats as one-off orders. Autoship saves the most on repeat essentials, and a toy bought on a schedule is just a toy arriving before you need it.",
      },
      {
        question: "Can I use the $20 gift card and the 35% first-Autoship discount together?",
        answer:
          "No — Chewy's first-order deals don't stack, so you pick one per order. Compare the final price: the gift card usually wins on a first order just over $49, while the 35% Autoship discount (up to $20) usually wins on a larger first food order. Check the live Chewy page on PawCoupons to see which deals are running right now.",
      },
      {
        question: "How do I time a pharmacy refill on Autoship?",
        answer:
          "Set the delivery frequency to match the dose schedule — usually monthly for flea, tick and heartworm medicine — and order the first refill a few days early, because the pharmacy needs your vet to approve the prescription. Once it's approved, Autoship keeps the refills coming, and you can skip a delivery if you still have doses left.",
      },
      {
        question: "What if my pet won't eat the new food I bought on sale?",
        answer:
          "Return it — Chewy offers free returns for 365 days, so a failed trial costs you nothing but the week you spent testing it. Next time, buy the smallest bag first and mix it with the old food gradually, and only move the new food onto Autoship once your pet is eating it happily.",
      },
    ],
  },
  {
    slug: "how-to-save-at-petco",
    title: "How to Save at Petco: Autoship, Treats Rewards & First-Order Codes (2026)",
    description:
      "How to save at Petco in 2026: the first Autoship discount, the free Treats rewards program, Vital Care membership perks, and the current live codes.",
    updatedAt: "2026-11-24",
    storeSlug: "petco",
    relatedGuides: ["black-friday-shopping-tips-2026"],
    relatedCategories: ["food-treats", "litter-cleaning"],
    intro: [
      "Petco's savings come in three layers: a deep discount on your first Autoship order, the free Treats rewards program that earns points on everything you buy, and the Vital Care membership for regular shoppers who want free shipping and grooming and vet savings.",
      "The live code list at the bottom of this page always shows the best Petco offer on PawCoupons right now — check it before you order, because a first-order code and the Autoship discount do not always stack.",
    ],
    sections: [
      {
        heading: "First Autoship order: the deepest single discount",
        paragraphs: [
          "Petco's first Autoship (repeat delivery) order gets the biggest percentage off of any single Petco offer. If the food or litter you buy every month is on Autoship, that first delivery is where the saving lives — later deliveries keep a smaller recurring discount.",
          "Compare it with the live first-order code on the Petco page before you check out: one of the two will be better for your cart, and you can usually only use one per order.",
        ],
      },
      {
        heading: "Treats rewards: free points on every order",
        paragraphs: [
          "Treats is Petco's free loyalty program. You earn points on every purchase — in store and online — and the points turn into rewards dollars you can spend on a later order. It costs nothing to join, and it stacks with promo codes and Autoship discounts.",
          "If you shop at Petco even a few times a year, joining Treats is the easiest saving on this page: sign up once, earn on everything, and spend the rewards on the next bag of food.",
        ],
        bullets: [
          "Free to join, points earned on eligible orders",
          "Rewards dollars to spend on later orders",
          "Stacks with promo codes and Autoship",
        ],
      },
      {
        heading: "Vital Care membership: worth it if you shop monthly",
        paragraphs: [
          "Vital Care is Petco's paid membership for regular shoppers. It bundles free shipping with savings on grooming and veterinary visits at Petco locations. If you buy food monthly and groom your dog a few times a year, the membership can pay for itself — but check the current terms on petco.com first, because the benefits and price change over time.",
          "If you only shop at Petco occasionally, skip the membership and stick with Treats points plus the live codes on the Petco page.",
        ],
      },
      {
        heading: "Best times to shop Petco",
        paragraphs: [
          "Petco's biggest savings cluster around Black Friday and Cyber Monday, with sitewide codes and extra Autoship offers. Between events, watch for first-order codes and seasonal sales on toys, beds and holiday items.",
          "For heavy items like litter and large food bags, check the free-shipping threshold before you celebrate a code — delivery on a heavy order can cost more than the code saves.",
        ],
      },
    ],
    faqs: [
      {
        question: "What is the best Petco promo code today?",
        answer:
          "Petco's best offer is usually the first Autoship discount or a first-order code. The live list on our Petco page always shows the best current code — check there before you order.",
      },
      {
        question: "Is Petco Treats free to join?",
        answer:
          "Yes. Treats is Petco's free loyalty program. You earn points on eligible purchases and turn them into rewards dollars for later orders.",
      },
      {
        question: "Can I stack a promo code with Autoship at Petco?",
        answer:
          "Usually you can only use one discount per order, so compare the first Autoship discount with the live first-order code and pick the one that saves more on your cart.",
      },
      {
        question: "Does Petco offer free shipping?",
        answer:
          "Petco offers free shipping above a minimum order value, and Vital Care members get free shipping as part of the membership. Check the current threshold on the Petco page before you check out.",
      },
    ],
  },
  {
    slug: "how-to-save-on-pet-pharmacy",
    title: "How to Save on Pet Pharmacy: Flea, Tick & Heartworm Meds Without Overpaying (2026)",
    description:
      "How to save on pet medication in 2026: compare Chewy Pharmacy, PetCareRx and 1-800-PetMeds, watch Rx exclusions in sitewide codes, use Autoship for chronic meds, and check membership pricing before you buy.",
    updatedAt: "2026-11-24",
    relatedGuides: [
      "how-to-save-at-chewy",
      "black-friday-shopping-tips-2026",
    ],
    relatedCategories: ["pharmacy"],
    intro: [
      "Flea, tick and heartworm medication is the most expensive repeat purchase most pet owners make — and the one where a promo code most often fails, because sitewide codes usually exclude prescription items.",
      "The trick is to compare the pharmacy-specific offers across Chewy Pharmacy, PetCareRx and 1-800-PetMeds before you buy, and to check the code's exclusions first. A 25% pharmacy code beats a 30% sitewide code that excludes your medication.",
    ],
    sections: [
      {
        heading: "First, check whether the code excludes prescriptions",
        paragraphs: [
          "Most sitewide promo codes exclude prescription medication and a few manufacturer-restricted brands. Before you shop, read the exclusions on the coupon: if your cart is mostly Rx items, look for a pharmacy-specific code instead — PetCareRx and Chewy Pharmacy both run codes made for prescription orders.",
          "Over-the-counter flea and tick products are usually not excluded, so a sitewide code can still work well for those.",
        ],
      },
      {
        heading: "Compare the three pharmacies on the same medication",
        paragraphs: [
          "Prices for the same medication vary between Chewy Pharmacy, PetCareRx and 1-800-PetMeds, and the best store changes with each sale. Check the live codes on each store's PawCoupons page, then compare the final price after the code — not the shelf price before it.",
          "Also compare pack sizes: a 6-month supply is usually cheaper per dose than a 1-month supply, and the saving grows when a percentage code applies to the bigger pack.",
        ],
      },
      {
        heading: "Autoship for chronic medication",
        paragraphs: [
          "If your pet takes the same medication every month, Autoship is the easiest recurring saving: the first Autoship order gets the deepest discount, and later deliveries keep saving. You will need a valid prescription from your vet — the pharmacy contacts your vet to confirm it.",
          "Set the delivery frequency to match the dose schedule, and skip or delay a delivery if you still have doses left. Never stockpile more than you can use before the expiry date.",
        ],
      },
      {
        heading: "Membership pricing: check before you pay for it",
        paragraphs: [
          "PetCareRx runs a PetPlus membership with wholesale pricing and free shipping, and it often goes on deep discount for the annual plan. If you buy medication every month, the membership can beat one-off codes — but do the math first: compare the member price plus the membership cost against the best live code without it.",
        ],
      },
      {
        heading: "What you need before you order",
        paragraphs: [
          "Prescription medication needs a valid prescription from your veterinarian. The pharmacy will usually contact your vet directly, so have your vet's name and phone number ready. Allow extra days for the first order while the prescription is confirmed.",
        ],
      },
    ],
    faqs: [
      {
        question: "Why doesn't my promo code work on pet medication?",
        answer:
          "Most sitewide codes exclude prescription medication and some restricted brands. Look for a pharmacy-specific code on the store's PawCoupons page instead — those are made for Rx orders.",
      },
      {
        question: "Which is cheapest: Chewy Pharmacy, PetCareRx or 1-800-PetMeds?",
        answer:
          "It changes with each sale. Compare the live codes on all three store pages on PawCoupons and check the final price after the code — the cheapest store is different almost every month.",
      },
      {
        question: "Do I need a prescription to order pet medication online?",
        answer:
          "Yes, for prescription medication. The pharmacy contacts your vet to confirm the prescription, so have your vet's details ready and allow extra days for the first order.",
      },
      {
        question: "Does Autoship save money on pet medication?",
        answer:
          "Yes — the first Autoship order gets the deepest discount and later deliveries keep saving. It works best for medication your pet takes every month on a fixed schedule.",
      },
    ],
  },
  {
    slug: "dog-and-cat-food-by-age",
    title: "Dog and Cat Food by Age: What to Feed a Puppy, Kitten, Adult and Senior Pet (2026)",
    description:
      "How to choose food for your dog or cat at every life stage: puppy and kitten food for growth, adult food for weight, and senior food for joints, kidneys and teeth — plus how to switch without an upset stomach.",
    updatedAt: "2026-11-26",
    petCategory: "food-treats",
    image: "/guides/dog-and-cat-food-by-age.webp",
    relatedGuides: [
      "how-to-save-at-chewy",
      "how-to-save-on-pet-pharmacy",
    ],
    relatedCategories: ["food-treats", "pharmacy"],
    intro: [
      "A puppy and a ten-year-old dog may live in the same house, but they should not eat the same food. Puppies and kittens are building bone, muscle and brain tissue, so they need more calories and protein per bite than an adult. Seniors, on the other hand, move less, digest more slowly and often carry a health problem or two — their food needs to work harder on joints, kidneys and teeth, not just fill the bowl.",
      "This guide walks through each life stage for dogs and cats, what to look for on the bag, and how to change foods without a week of upset stomachs. The live food coupons at the bottom of the page are the current offers for the foods mentioned here — check them before you order, because the best deal changes with your cart.",
    ],
    sections: [
      {
        heading: "Puppies and kittens: food for growing, not just eating",
        paragraphs: [
          "Young pets grow fast, and their food has to keep up. Puppy and kitten formulas are denser in calories and protein than adult food, and they carry the calcium and phosphorus a growing skeleton needs. Large-breed puppies are the exception to the 'more is better' rule: too many calories too fast can make them grow too quickly for their joints, so large-breed puppy food is deliberately a little leaner.",
          "Feed young pets three to four small meals a day instead of one big bowl, and keep the same food for at least the first few weeks after you bring them home. A sudden change of food on top of a new home is the most common cause of a puppy's first upset stomach.",
        ],
        bullets: [
          "Puppy and kitten food until about 12 months (18–24 months for large and giant dog breeds)",
          "Three to four small meals a day for puppies and kittens under six months",
          "Large-breed puppy food for dogs expected to weigh over 25 kg as adults",
        ],
      },
      {
        heading: "Adults: hold the weight, not the calories",
        paragraphs: [
          "Once growth stops, the job of food changes from building to maintaining. Most adult dogs and cats do best on a food matched to their activity level: a working dog or an outdoor cat burns far more than a couch dog or an indoor cat, and the same cup of kibble can be too much for one and too little for the other.",
          "Weigh your pet every month or two, and use the ribs test — you should feel the ribs easily under a thin layer of fat, and see a waist from above. If the waist disappears, cut the food by about 10% before you blame the treats, and measure with a cup instead of pouring from the bag.",
        ],
      },
      {
        heading: "Seniors: joints, kidneys, teeth — and fewer calories",
        paragraphs: [
          "Around seven years for most dogs and ten for most cats, the body starts asking for different food. Senior formulas are usually lower in calories, easier to digest, and richer in joint support such as glucosamine and omega-3s. For cats, kidney health becomes the quiet priority: senior cat food is often lower in phosphorus, and fresh water matters as much as the food itself.",
          "Dental problems are common at this age, so watch how your pet eats. A senior who drops kibble, chews on one side or walks away from a full bowl may need a smaller kibble, a softer texture or a dental check — not a new flavour.",
        ],
        bullets: [
          "Switch to a senior formula around age 7 for dogs and age 10 for cats",
          "Look for joint support and easily digestible protein in senior food",
          "Offer fresh water at all times, especially for senior cats",
        ],
      },
      {
        heading: "How to switch foods without an upset stomach",
        paragraphs: [
          "Never change food in one meal. Mix the new food into the old one over seven to ten days: a quarter new for two days, half for two days, three quarters for two days, then fully new. Puppies, kittens and seniors need the slow end of that range.",
          "Some loose stool in the first few days is normal, but vomiting, refusing food for more than a day, or diarrhoea that lasts past the switch means you should slow down — or ask your vet whether the new food suits your pet at all.",
        ],
      },
      {
        heading: "What the label actually tells you",
        paragraphs: [
          "The first ingredient should be a named animal protein — chicken, salmon, lamb — not a vague 'meat meal'. After that, check the life-stage statement on the bag: it should say 'for puppies', 'for adult maintenance' or 'for senior pets', and ideally name the feeding trial or AAFCO statement that backs it up.",
          "Ignore the picture on the front and read the guaranteed analysis instead. Protein and fat percentages, plus the calorie count per cup, are what decide whether a food fits your pet — a glossy coat on the packaging is not a nutrient.",
        ],
      },
    ],
    faqs: [
      {
        question: "When should I switch my puppy to adult food?",
        answer:
          "Most puppies move to adult food at about 12 months, but large and giant breeds should stay on puppy food until 18–24 months because they keep growing for longer. Ask your vet at the one-year check if you are unsure — the breed and the adult weight matter more than the birthday.",
      },
      {
        question: "Can my dog and cat share the same food?",
        answer:
          "No, not as a daily diet. Cats need taurine and more protein than dogs, and cat food is too rich for most dogs. A stolen mouthful now and then is harmless, but a cat fed on dog food can develop heart and eye problems over time.",
      },
      {
        question: "Is senior food really different, or just marketing?",
        answer:
          "It is genuinely different for most pets: fewer calories, easier-to-digest protein, and added joint support. The difference matters most for pets with early kidney, joint or weight problems — a healthy senior on a good adult food does not need to switch on a fixed birthday.",
      },
      {
        question: "My pet refuses the new food. What should I do?",
        answer:
          "Go back a step in the mix and slow the switch down, and warm the food slightly or add a spoonful of wet food to make it smell better. If your pet still refuses for more than a day, or loses weight, stop and ask your vet — refusing food can be a health problem, not just fussiness.",
      },
    ],
  },
  {
    slug: "common-pet-illnesses-by-season",
    title: "Common Pet Illnesses by Season: Flea, Tick, Allergies and Winter Joint Care (2026)",
    description:
      "What to watch for in your dog or cat each season: spring allergies and itchy skin, summer fleas, ticks and heatstroke, autumn parasites, and winter joint pain and dry skin — and when a symptom means a vet visit, not a home remedy.",
    updatedAt: "2026-11-26",
    petCategory: "pharmacy",
    image: "/guides/common-pet-illnesses-by-season.webp",
    relatedGuides: [
      "how-to-save-on-pet-pharmacy",
      "how-to-save-at-chewy",
      "black-friday-shopping-tips-2026",
    ],
    relatedCategories: ["pharmacy", "toys-gear"],
    intro: [
      "Pets get sick on a calendar. Spring brings pollen and itchy skin, summer brings fleas, ticks and heat, autumn brings a second wave of parasites as animals come indoors, and winter brings stiff joints and dry, cracked skin. Knowing what is normal for the season — and what is a warning sign — saves you a panicked midnight search and a vet bill that could have been smaller a week earlier.",
      "This guide covers the most common seasonal problems for dogs and cats, what you can do at home, and when to call the vet instead. The live pharmacy coupons at the bottom are the current offers for the flea, tick and allergy products mentioned here.",
    ],
    sections: [
      {
        heading: "Spring: allergies, itchy skin and shedding",
        paragraphs: [
          "Pollen season is allergy season for pets too. The signs are usually skin first, not sneezing: licking paws, scratching ears, red bellies and hot spots where the coat has been chewed thin. Dogs with floppy ears and cats that groom obsessively are the first to show it.",
          "Bathing with a gentle, oatmeal-based shampoo once a week can wash pollen off the coat, and wiping paws after walks keeps it out of the house. If the itching keeps your pet awake at night, or the skin breaks and smells, that is a vet visit — over-the-counter allergy products help mild cases, but infected skin needs treatment, not just a bath.",
        ],
      },
      {
        heading: "Summer: fleas, ticks, heartworm and heatstroke",
        paragraphs: [
          "Warm weather is parasite season. Fleas and ticks are at their worst from late spring through summer, and a single missed month of prevention is enough for an infestation. Check the ears, armpits and groin after walks in long grass, and keep prevention going all summer — stopping in August is the most common mistake, because fleas stay active well into autumn.",
          "Heat is the other summer danger, and it kills faster than parasites. Never leave a pet in a parked car, even with a window open, and walk dogs early in the morning or late in the evening. Heavy panting, drooling, wobbling or vomiting after heat exposure is an emergency: cool the pet with wet towels and get to a vet immediately.",
        ],
        bullets: [
          "Keep flea, tick and heartworm prevention going from spring through autumn",
          "Check for ticks after walks in grass and woods",
          "Walk dogs before 10am or after 6pm on hot days, and always carry water",
        ],
      },
      {
        heading: "Autumn: the parasite second wave and upset stomachs",
        paragraphs: [
          "As the weather cools, fleas move indoors, where central heating keeps them alive all winter. An autumn flea problem often looks like a winter one, because the fleas are living in carpets and bedding, not on the grass. Wash bedding hot, vacuum often, and treat the pet and the house together — treating only one leaves the other as a reservoir.",
          "Autumn is also the season of scavenged food: fallen fruit, mushrooms and Halloween sweets. Chocolate, xylitol and grapes are all toxic to dogs, and a surprising number of autumn vet visits start with a bin that was not as dog-proof as its owner thought.",
        ],
      },
      {
        heading: "Winter: stiff joints, dry skin and cold paws",
        paragraphs: [
          "Cold makes old joints worse. A senior dog that is slow to stand in the morning, hesitates at stairs or limps for the first few minutes of a walk is telling you its joints hurt — not that it is lazy. A warm bed off the floor, a shorter but more frequent walk, and joint support in food or as a supplement all help, and your vet can add pain relief if the stiffness lasts.",
          "Dry winter air dries skin and cracks paw pads, especially where roads are salted. Rinse paws after winter walks, use a paw balm if the pads crack, and watch for a cat that stops grooming — in winter that is often a sign of joint pain, not laziness.",
        ],
      },
      {
        heading: "When a seasonal symptom needs a vet, not a home remedy",
        paragraphs: [
          "Most seasonal problems start mild and get worse slowly, which is why they are easy to miss. Call the vet the same day if your pet stops eating for more than a day, vomits repeatedly, has trouble breathing, collapses, or has a wound that smells or spreads. For flea and allergy products, use a pharmacy-specific code and check the exclusions first — sitewide codes usually exclude prescription medication.",
          "Keep a note of when each symptom started and what changed that week — a new food, a new walk route, a missed prevention dose. Vets diagnose seasonal problems faster with a timeline than with a description of the itch alone.",
        ],
      },
    ],
    faqs: [
      {
        question: "Do I need flea prevention in winter too?",
        answer:
          "In most of the US, yes — fleas survive indoors all winter in heated homes, and a gap in prevention is how a small problem becomes an infestation. If your winters are long and hard and your pet never goes outside, ask your vet whether you can pause, but do not stop on your own in autumn.",
      },
      {
        question: "How do I know if my pet's itching is allergies or fleas?",
        answer:
          "Flea itching is usually around the tail base and back legs, and you may see flea dirt — tiny black specks that turn red on wet paper. Allergy itching is usually paws, ears and belly, and it follows the pollen season. If you are not sure, check for fleas first: it is the cheaper problem to rule out.",
      },
      {
        question: "Is heatstroke really an emergency, or can I cool my dog at home?",
        answer:
          "It is an emergency. Cool your dog with wet towels and fans on the way to the vet — do not use ice water, and do not wait to see if it passes. Dogs that look better after cooling can still have organ damage, so a vet check is needed even if the panting stops.",
      },
      {
        question: "My senior dog is stiff in winter. Is that just old age?",
        answer:
          "Stiffness is common with age, but it is not something to ignore — it is usually arthritis, and it can be treated. A warm bed, joint support and shorter, more frequent walks help, and your vet can prescribe pain relief that makes a real difference to a senior dog's winter.",
      },
    ],
  },
];

export function getSortedGuides(): Guide[] {
  return [...GUIDES].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );
}

export function getGuide(slug: string): Guide | undefined {
  const normalized = slug.trim().toLowerCase();
  return GUIDES.find((g) => g.slug === normalized);
}

export function getGuideForStore(storeSlug: string): Guide | undefined {
  const normalized = storeSlug.trim().toLowerCase();
  return GUIDES.find((g) => g.storeSlug === normalized);
}
