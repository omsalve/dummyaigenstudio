# Light Matter Reality: website copy

Version 1.0 · 20 October 2026 · Indian English (en-IN)

This file is the readable copy deck. `content/copy.json` holds the same copy, structured page → section → key for wiring. The JSON is the source of truth, and this file was generated from it, so the two match.

**How to read it**

- Every section carries a status. **Live** means an existing component renders it today, and the JSON keys mirror the content file it belongs in, so wiring is a copy. **Scaffold slot** means `app/page.tsx` marks the spot but no component exists. **New** means there's no slot or route yet.
- Lines in *italics* or quoted with `>` are notes for whoever wires this in. They aren't site copy.
- Anything in [square brackets] needs a real value before launch. The full list is near the end.
- Typography: curly apostrophes and quotes throughout (the accent italic needs them), en dashes only in number ranges, no em dashes.

## Decisions worth knowing

1. **Primary tagline: “Taste can’t be prompted.”** It’s the only one of the three a competitor can’t say with a straight face, and it moves the AI conversation onto taste, which is the argument LMR wins. “We did it the hard way first.” is proof rather than a promise, so it heads the proof section and runs through the Studio page. “Crafted by people. Accelerated by AI.” is the clearest of the three, so it goes wherever clarity beats wit: proposals, LinkedIn, directory listings.
2. **Two offers renamed.** Festive Drop becomes Festive Edit, and Look Expensive Kit becomes Project Portrait. Launch Story and Molecule Story stay. Reasons are in the offer-naming section.
3. **‘Architecture’ in the homepage components, ‘Architecture & Interiors’ everywhere else.** One `name` field feeds FlagshipStage, MassField and StringChapter. MassField words never wrap, and the widest word sets how far its column curves. Measured with the site’s own fonts at 1440px, the full name flattens that curve to 17%. Interiors stays visible in the offerings and the panel copy, and the nav, pages and meta use the full name.
4. **The hero has no subline slot.** The subline is written and stored. It needs a slot between the statement and the lockup, which is a layout change, so it hasn’t been made.
5. **Homepage order.** The repo’s order is kept, with the sitemap’s extra sections slotted in: Hero, Positioning, the services and industries field, the industries chapter, Proof, Process teaser, Engagements, Offers teaser, Contact CTA. Light, Matter and Reality appear as words in the field, because `app/page.tsx` notes the triptych was replaced on purpose.
6. **Meta description.** `app/layout.tsx` uses `hero.statement` as the site description. With the new statement that would be 24 characters long, so use `home.meta.description` instead.
7. **The pain lines aren’t testimonials.** They’re written in the owner’s inner voice, unattributed and without quote marks. Keep them that way.
8. **Every live slot was measured.** Hero lines, MassField words and notes, StringChapter panels and flagship titles were checked against Geist and Instrument Serif at 1440px and 390px. Fit notes sit with each live section.

## Wiring map

| Copy | Status | Goes into |
|---|---|---|
| `global › brand` | Live | content/brand.ts › brand (BrandLockup.tsx; descriptor also renders as the MassField frame label) |
| `global › industries` | Live (name) / New (the rest) | name → content/verticals.ts (renders in FlagshipStage, MassField and StringChapter). navLabel and fullName are for the nav, pages and meta. |
| `global › notFound` | New | app/not-found.tsx |
| `global › og` | New | app/layout.tsx metadata (openGraph, twitter). Per-page OG lines sit in each page’s meta. |
| `home › hero` | Live | content/home.ts › hero, rendered by components/home/Hero.tsx |
| `home › flagship` | Live | content/home.ts › flagshipStage, plus titles and tags in content/flagship.ts. Rendered by components/home/FlagshipStage.tsx |
| `home › positioning` | Scaffold slot | app/page.tsx {/* [SCAFFOLD] Positioning */}. No component yet. |
| `home › servicesAndIndustries` | Live | content/home.ts › massField; content/services.ts (category names, services); content/verticals.ts (names); content/industries.ts (offerings). Rendered by components/home/MassField.tsx via ServicesSection.tsx. The frame label comes from brand.descriptor (Creative Studio). Light, Matter and Reality live here by design: app/page.tsx notes the triptych was replaced by this field. |
| `home › industriesChapter` | Live | content/home.ts › stringChapter; content/industries.ts (headline, description, cards). Rendered by components/home/StringChapter.tsx via IndustriesSection.tsx |
| `home › proof` | New | No slot. Suggested placement: after the industries chapter, before Engagements. |
| `home › processTeaser` | New | No slot. Suggested placement: after Proof. |
| `home › engagements` | Scaffold slot | app/page.tsx {/* [SCAFFOLD] Engagements */}. No component yet. |
| `home › offersTeaser` | New | No slot. Suggested placement: after Engagements, before the Contact CTA. |
| `home › contactCta` | Scaffold slot | app/page.tsx {/* [SCAFFOLD] Contact CTA */}. No component yet. |

New pages need routes. Suggested: `/studio`, `/light`, `/matter`, `/reality`, `/industries/jewellery-fashion`, `/industries/real-estate`, `/industries/architecture-interiors`, `/industries/pharma`, `/how-we-work`, `/offers`, `/work` (plus `/work/[slug]`), `/journal` (plus `/journal/[slug]`), `/contact` and `app/not-found.tsx`.

---

## 1. Home

`/` · Built in part: app/page.tsx

| Meta | Copy | Chars |
|---|---|---|
| Title | AI Creative Studio in Mumbai \| Light Matter Reality | 51 |
| Description | Film, design and web for jewellery, real estate, architecture and pharma. An AI-led Mumbai studio built by people who learnt the craft before AI. | 145 |
| OG title | Taste can’t be prompted. \| Light Matter Reality | 47 |
| OG description | An AI-led creative studio in Mumbai, built by people who learnt film, design and brand before AI made it look easy. | 115 |

> *Note: app/layout.tsx metadata. It currently uses hero.statement as the description, which would leave a 24-character description; point it at this description instead.*

**Keywords:** primary *AI creative studio Mumbai* · secondary: AI ad films, AI product photography, brand film production Mumbai, creative agency Mumbai

### Hero

***Live** · content/home.ts › hero, rendered by components/home/Hero.tsx*

> *Fit: Sets on two lines at 1440px (about 390px and 265px in the 550px measure), the same mass as today. The accent must appear verbatim in the statement.*

**Statement:** Taste can’t be prompted.  
**Accent (set in the italic):** prompted.  
**Action:** Explore work → `#work`  
**Subline:**  
An AI-led creative studio in Mumbai, built by people who learnt film, design and brand before AI made it look easy.

> *Subline: No slot yet: Hero.tsx renders the statement, the lockup, a rule and the action. If a subline is added, it belongs between the statement and the lockup. Until then it works as the share description.*

**Alternates:**

- We did it the hard way first. *(accent: first.)*
- Crafted by people. Accelerated by AI. *(accent: AI.)*

> *Alternates: ‘Crafted by people. Accelerated by AI.’ fits the hero’s one-sentence-per-line grid exactly (about 514px and 501px), so it’s a drop-in if you ever want a calmer hero.*

### Flagship stage

***Live** · content/home.ts › flagshipStage, plus titles and tags in content/flagship.ts. Rendered by components/home/FlagshipStage.tsx*

> *Fit: Titles of 18 characters or fewer fit beside every industry name on a phone. Longer ones truncate.*

**Label:** Selected work  
**View (hover label):** View project  
**Pause:** Pause  
**Play:** Play  
**Subject (assistive tech, after Play/Pause):** showreel  

- **[CASE STUDY PLACEHOLDER: jewellery & fashion flagship, max 18 characters]** *(Concept)* · Vertical: `solar`
- **[CASE STUDY PLACEHOLDER: real estate flagship, max 18 characters]** *(Client work)* · Vertical: `cobalt`
- **[CASE STUDY PLACEHOLDER: architecture & interiors flagship, max 18 characters]** *(Client work)* · Vertical: `citrus`
- **[CASE STUDY PLACEHOLDER: pharma flagship, max 18 characters]** *(Concept)* · Vertical: `coral`

> *Items: Title the work like a film, never after the client. Tags must be true: ‘Concept’ for self-initiated work, ‘Client work’ only for a real brief shared with permission. The tags shown are the current placeholders. [VERIFY: tag for each flagship]*

### Positioning

***Scaffold slot** · app/page.tsx {/* [SCAFFOLD] Positioning */}. No component yet.*

**Eyebrow:** The studio  
**Statement:** Anyone can generate an image now. Almost no one knows which one to keep.  
**Body:**  
AI made content cheap, fast and endless. Most of it looks the same, because everyone is using the same tools. What’s missing is everything the tools can’t do: story, narrative, taste, and a feel for why people buy.

We learnt that part the slow way, on film sets, in edit suites and in strategy rooms. Now AI makes our pipeline faster. It doesn’t make the calls.

**Kicker:** Craft first. AI second.  
**CTA:** Read the manifesto → `/studio`  

### Services and industries (MassField)

***Live** · content/home.ts › massField; content/services.ts (category names, services); content/verticals.ts (names); content/industries.ts (offerings). Rendered by components/home/MassField.tsx via ServicesSection.tsx. The frame label comes from brand.descriptor (Creative Studio). Light, Matter and Reality live here by design: app/page.tsx notes the triptych was replaced by this field.*

> *Fit: Words are uppercase and never wrap, and the widest word in a column sets how far that column curves. Services: CRM AUTOMATION is widest, 91% of the full curve (today’s placeholders give 61%). Industries: JEWELLERY & FASHION is widest, 56%, and every offering is narrower. Rows: 18 services, 20 industries. The tagline and notes are no wider than the ones they replace.*

**Title:** What we make, and who we make it for  
**Services label:** Services  
**Industries label:** Industries  
**Tagline:** Craft first, AI second  
**Cue:** Scroll  
**Notes:**

- Light / Matter / Reality
- Brief / Narrative / Craft / AI / Delivery
- Story before prompts *(typed out behind a block cursor)*

**Service categories:**

- **Light** · Services: Brand films · Ad films · Reels · Product shoots · AI video
- **Matter** · Services: Brand strategy · Storytelling · Identity · Packaging · Social systems
- **Reality** · Services: Websites · Landing pages · 3D websites · Walkthroughs · CRM automation

**Verticals:**

- **Jewellery & Fashion** · ID: `solar`
- **Real Estate** · ID: `cobalt`
- **Architecture** · ID: `citrus`
- **Pharma** · ID: `coral`

**Industry offerings:**

- **Jewellery & Fashion (`solar`)** · Offerings: Jewellery shoots · Festive campaigns · AI lookbooks · Brand films
- **Real Estate (`cobalt`)** · Offerings: Launch campaigns · Project films · AI visuals · CRM workflows
- **Architecture (`citrus`)** · Offerings: Interior shoots · Walkthrough films · Portfolio sites · Practice brands
- **Pharma (`coral`)** · Offerings: Explainer films · Training videos · Social strategy · Websites

### Industries chapter (StringChapter)

***Live** · content/home.ts › stringChapter; content/industries.ts (headline, description, cards). Rendered by components/home/StringChapter.tsx via IndustriesSection.tsx*

> *Fit: At 1440px each headline sets on 2–3 lines and each description on 3–4 lines in the sticky panel. Card counts match today’s (2, 2, 1, 2), so scroll lengths don’t change.*

**ID:** `work`  
**Title:** The four industries we work in  
**Nav label:** Industries  
**Count joiner (renders “OF 04”):** of  

#### 01 Jewellery & Fashion (`solar`)

**Headline:** Show them why it costs what it costs.  
**Alternate headlines:**

- Gold should look like gold. Even on a phone.
- Famous on your street. Invisible on their phone.
- Every collection deserves its own world.

**Description:**  
Shoots, films and campaign worlds for jewellers and fashion studios. Bridal gold gets one world, beachwear silver another. Never the same template twice.

**Cards:**

- **[CASE STUDY PLACEHOLDER: jewellery & fashion 01, title under 40 characters]** *(Client work)* · Summary: [CASE STUDY PLACEHOLDER: one line on what we made and for whom, under 110 characters]
- **[CASE STUDY PLACEHOLDER: jewellery & fashion 02, title under 40 characters]** *(Concept)* · Summary: [CASE STUDY PLACEHOLDER: one line on what we made and for whom, under 110 characters]

#### 02 Real Estate (`cobalt`)

**Headline:** Every tower says luxury. Yours should say why.  
**Alternate headlines:**

- Ten towers on one road. One story buyers remember.
- Launch like the tower’s already standing.
- From EOI to possession, one story.

**Description:**  
Launch storytelling for residential projects in Mumbai, Thane and Navi Mumbai. Narrative, films, AI visuals, landing pages and CRM workflows, from pre-launch to possession.

**Cards:**

- **[CASE STUDY PLACEHOLDER: real estate 01, title under 40 characters]** *(Concept)* · Summary: [CASE STUDY PLACEHOLDER: one line on what we made and for whom, under 110 characters]
- **[CASE STUDY PLACEHOLDER: real estate 02, title under 40 characters]** *(Client work)* · Summary: [CASE STUDY PLACEHOLDER: one line on what we made and for whom, under 110 characters]

#### 03 Architecture (`citrus`)

**Headline:** Your spaces look expensive. Your portfolio doesn’t.  
**Alternate headlines:**

- Look as expensive as the spaces you build.
- Finished beautifully. Shot on a phone.
- Referrals built the practice. The work should grow it.

**Description:**  
Shoots, films and websites for architects and interior designers, so the practice looks as considered as the spaces it creates.

**Cards:**

- **[CASE STUDY PLACEHOLDER: architecture & interiors 01, title under 40 characters]** *(Client work)* · Summary: [CASE STUDY PLACEHOLDER: one line on what we made and for whom, under 110 characters]

#### 04 Pharma (`coral`)

**Headline:** Make the mechanism make sense.  
**Alternate headlines:**

- Serious science. Watchable stories.
- Small pharma. Modern presence.
- Precision and story aren’t opposites.

**Description:**  
Explainer films, training videos, social and websites for small and mid pharma companies. Written from your approved claims, and reviewed by your medical team.

**Cards:**

- **[CASE STUDY PLACEHOLDER: pharma 01, title under 40 characters]** *(Concept)* · Summary: [CASE STUDY PLACEHOLDER: one line on what we made and for whom, under 110 characters]
- **[CASE STUDY PLACEHOLDER: pharma 02, title under 40 characters]** *(Client work)* · Summary: [CASE STUDY PLACEHOLDER: one line on what we made and for whom, under 110 characters]

> *Cards: Card tags are today’s placeholders. [VERIFY: tag for each card]*

### Proof: pre-AI craft, AI speed

***New** · No slot. Suggested placement: after the industries chapter, before Engagements.*

**Eyebrow:** Pre-AI craft. AI speed.  
**Headline:** We did it the hard way first.  
**Body:**  
Before AI, we lit sets, cut films, built brands and sat in strategy rooms working out why people buy. That part takes years. The tools took weeks.

**Craft: What took years**

- How light falls on gold, glass and skin.
- Where a cut lands, and when to hold the shot.
- Why a buyer stops scrolling, and why they don’t.
- How a brand becomes the one people ask for by name.

**AI column: What AI changed**

- Worlds, without building sets.
- Visuals, before the renders exist.
- More directions, explored before you commit.
- Cut-downs, sizes and language versions, without starting over.

**Line:** AI speeds up the pipeline. It doesn’t replace the judgment.  
**Stats:**

- **[VERIFY: combined years of experience]** Years of combined craft, before AI
- **[VERIFY: number of disciplines in the studio]** Disciplines under one roof
- **[VERIFY: combined films, shoots and brands delivered]** Projects delivered the hard way

**Disciplines:**  
Graphic designers. Filmmakers. Cinematographers. Editors. Brand strategists. Creative strategists. Creative directors.

### Process teaser

***New** · No slot. Suggested placement: after Proof.*

**Eyebrow:** How we work  
**Headline:** Brief. Narrative. Craft. Then AI.  
**Steps:**

- **01 Brief**: We find out what you’re really selling, and to whom.
- **02 Narrative**: We write the story before we touch a tool.
- **03 Craft**: Direction, shoots, design and edit, done properly.
- **04 AI acceleration**: AI where it saves time. Never where it costs taste.
- **05 Delivery**: Every format, on time, ready to go live.

**CTA:** See how we work → `/how-we-work`  

### Engagements

***Scaffold slot** · app/page.tsx {/* [SCAFFOLD] Engagements */}. No component yet.*

**Eyebrow:** Engagements  
**Headline:** Four ways to work with us. One is by invitation.  
**Models:**

- **Studio Retainer**: Your studio, every month. Strategy, shoots, design, films and web, end to end.
- **Strategy + Execution**: We set the digital direction, then we make it happen.
- **Project / Production**: One brief, a fixed scope, done properly. A brand film, a festive set, a landing page.
- **Growth Partnership** *(By invitation)*: Performance marketing, leads and revenue, alongside you. Offered to clients after about 90 days together.

**Footnote:** Growth Partnership isn’t on the menu. It’s offered to clients we already know well.  
**CTA:** See how engagements work → `/how-we-work#engagements`  

### Offers teaser

***New** · No slot. Suggested placement: after Engagements, before the Contact CTA.*

**Eyebrow:** Entry offers  
**Headline:** Not ready for a retainer? Start here.  
**Offers:**

- **Festive Edit** · Industry: Jewellery & Fashion · Pitch: Festive video ads and stills, ready before the season peaks. · Price: ₹[PRICE] · Turnaround: [TURNAROUND: Festive Edit] · CTA: See the offer → `/offers#festive-edit`
- **Launch Story** · Industry: Real Estate · Pitch: The EOI narrative, the launch film and a creative system to sell with. · Price: ₹[PRICE] · Turnaround: [TURNAROUND: Launch Story] · CTA: See the offer → `/offers#launch-story`
- **Project Portrait** · Industry: Architecture & Interiors · Pitch: One finished project, shot and filmed the way it deserves. · Price: ₹[PRICE] · Turnaround: [TURNAROUND: Project Portrait] · CTA: See the offer → `/offers#project-portrait`
- **Molecule Story** · Industry: Pharma · Pitch: An explainer film series that tells the science as a story. · Price: ₹[PRICE] · Turnaround: [TURNAROUND: Molecule Story] · CTA: See the offer → `/offers#molecule-story`

**CTA:** See all offers → `/offers`  

### Contact CTA

***Scaffold slot** · app/page.tsx {/* [SCAFFOLD] Contact CTA */}. No component yet.*

**Headline:** Bring us the brief.  
**Body:**  
Tell us what you’re launching, selling or fixing. We’ll tell you the story it needs, and what it takes to make it.

**Primary CTA:** Start a brief → `/contact`  
**Secondary CTA:** Email the studio → `mailto:[VERIFY: studio email]`  

---

## 2. Studio / Manifesto

`/studio` · New page

| Meta | Copy | Chars |
|---|---|---|
| Title | The Studio \| A Faceless, AI-led Creative House \| LMR | 52 |
| Description | No founder story, no faces. LMR is an AI-led creative studio in Mumbai where craft comes first, AI comes second and the work does the talking. | 142 |
| OG title | Behind the camera. On purpose. \| Light Matter Reality | 53 |
| OG description | A faceless creative studio in Mumbai. Craft first, AI second, and the work does the talking. | 92 |

**Keywords:** primary *creative studio Mumbai* · secondary: AI creative agency Mumbai, brand storytelling studio, faceless creative studio

### Hero

**Eyebrow:** The studio  
**Headline:** Behind the camera. On purpose.  
**Body:**  
You won’t find our faces on this site. You’ll find the work. Light Matter Reality is an AI-led creative studio in Mumbai, and it speaks as one studio, not as a collection of personal brands.

### Why faceless

**Headline:** Why there are no faces here.  
**Body:**  
Most studios sell a personality. We’d rather you judged the work.

A face invites the wrong questions: who did what, who’s senior, whose taste you’re paying for. A studio answers the only one that matters: is the work good?

Hire LMR and you hire all of it: the cinematographer’s eye, the editor’s timing, the designer’s restraint, the strategist’s logic. One studio. One signature.

### Manifesto

**Headline:** What we believe  
**Tenets:**

- **01 Taste can’t be prompted.** Anyone can generate an image. Knowing which one to keep, and why, is the job. That’s taste, and there’s no shortcut to it.
- **02 We did it the hard way first.** We learnt light on sets, rhythm in edit suites and persuasion in strategy rooms, long before AI. That’s how we know when a generated frame is lying.
- **03 AI is the accelerator. Never the author.** AI speeds up the pipeline: worlds, variations, versions. The story, the choices and the sign-off stay human.
- **04 Story before spectacle.** A beautiful frame with nothing to say is still nothing. We find the narrative first. Then we make it beautiful.
- **05 No copy-paste strategy.** Bridal gold and beachwear silver don’t live in the same world. Neither do a Thane 2BHK and a sea-facing flat in Worli. Every brand gets its own.
- **06 We study why people buy.** Before we make anything, we work out what your buyer wants, what they fear, and what they’ll tell their family. Then we make that.
- **07 Some things need a real set.** Gold, fabric, a finished space: some things have to be shot for real. We have the crew for that, and the judgment to know when.
- **08 The work does the talking.** No faces, no founder myth. If the work doesn’t convince you, nothing we say about ourselves should.

### What we are, what we’re not

**Headline:** What we are. What we’re not.  
**Are:**

- A creative studio that uses AI
- Trained in film, design and brand before the tools arrived
- On the ground when it has to be real
- One studio voice, from brief to delivery

**Are not:**

- A prompt shop
- A template factory
- A personality brand
- A content mill with a nice logo

### Combined experience

**Headline:** Counted together.  
**Body:**  
Between us: [VERIFY: combined years of experience] years across film sets, edit suites, design studios and strategy rooms. We count it together, because that’s how we work.

**Disciplines label:** Disciplines in the studio  
**Disciplines:** Graphic design · Filmmaking · Cinematography · Editing · Brand strategy · Creative strategy · Creative direction  

### The name

**Headline:** The name is the studio.  

- **Light: How you’re seen.** Film and photography: brand films, ad films, reels, product shoots, AI video.
- **Matter: What you’re made of.** Design and brand: strategy, storytelling, identity, packaging, social systems.
- **Reality: Where it all works.** Web and immersive: websites, landing pages, 3D sites, walkthroughs, apps and CRM automation.

### CTA

**Headline:** Judge us by the work.  
**Body:** Then send us a brief.  
**Primary CTA:** See the work → `/work`  
**Secondary CTA:** Start a brief → `/contact`  

---

## 3a. Light

`/light` · New page

| Meta | Copy | Chars |
|---|---|---|
| Title | Light \| Brand Films, Ad Films & AI Video in Mumbai \| LMR | 56 |
| Description | Brand films, ad films, reels, product shoots and AI video from a Mumbai studio that lit real sets long before it rendered AI ones. | 130 |
| OG title | Light: film and photography \| Light Matter Reality | 50 |
| OG description | Brand films, ad films, reels, product shoots and AI video. Some things need a real set. Some don’t. We know which. | 114 |

**Keywords:** primary *brand film production Mumbai* · secondary: ad film production Mumbai, AI ad films, AI video production India, product photography Mumbai, AI product photography

### Hero

**Eyebrow:** Light · Film and photography  
**Name:** Light  
**Headline:** Everything starts with how it’s lit.  
**Body:**  
Brand films, ad films, reels, product shoots and AI video, made by people who learnt light on real sets. That’s why the generated ones hold up.

### Real or generated

**Headline:** Some things need a real set. Some don’t. We know which.  
**Body:**  
Gold has to catch real light. A sea view from a tower that isn’t built yet can be imagined. We decide shot by shot: real production where the product must be true, AI where it buys you speed, scale or a world you couldn’t build. Most projects use both.

### Services

**Headline:** What Light makes  

- **Brand films**: The film that tells people who you are, without a voice-over saying so. Concept, script, shoot, edit, grade and sound.
- **Ad films**: Fifteen, thirty and sixty-second spots made for the platform they’ll run on, with cut-downs planned from day one.
- **Reels and short-form**: A hook in the first second, pacing that holds, an ending worth sharing. Cut by editors who were cutting long before Reels.
- **Product shoots**: Studio and on-location photography for things that have to look real: jewellery, fabric, packaging, finished spaces.
- **AI product photography**: We shoot the product for real, then build the world around it. Collections go out faster, without a new set for every drop.
- **AI video**: Generated worlds, impossible camera moves and scenes you couldn’t afford to build, directed like a real production.

### Directed, not generated

**Headline:** Directed, not generated.  
**Body:**  
Every AI frame goes past the same eyes that would judge a real one: a director’s, a cinematographer’s, an editor’s. If it wouldn’t survive a real edit, it doesn’t ship.

### By industry

**Headline:** Light, by industry  

- **Jewellery & Fashion**: Jewellery shoots lit for metal and stone, festive ad films, AI lookbooks. → `/industries/jewellery-fashion`
- **Real Estate**: Pre-launch teasers, launch films, walkthroughs and handover films. → `/industries/real-estate`
- **Architecture & Interiors**: Architectural and interior photography, project films. → `/industries/architecture-interiors`
- **Pharma**: Mechanism explainers, training videos, and ad films where advertising is permitted. → `/industries/pharma`

### FAQ

**Headline:** Questions  

- **Is everything you make AI?**  
  No. We shoot for real when the product has to be true, and use AI where it adds speed, scale or worlds we couldn’t build. Most projects use both.
- **Do you shoot on location in Mumbai?**  
  Yes. We’re based in Mumbai and shoot across Mumbai, Thane and Navi Mumbai. Further afield on request. [VERIFY: travel policy]
- **Will AI visuals look fake?**  
  Not if they’re directed properly. Every generated frame is judged against the standard of a real shoot. If it looks fake to us, it never reaches you.
- **How long does a brand film take?**  
  It depends on the scope. As a guide, [TURNAROUND: brand film, brief to delivery]. Ad film sets and reels move faster.
- **Who owns the footage?**  
  Usage rights are set out in every contract before work begins. [VERIFY: standard ownership and usage terms]

### CTA

**Headline:** Bring it to light.  
**Body:** Tell us what needs to be seen, and by whom.  
**Primary CTA:** Start a brief → `/contact`  

---

## 3b. Matter

`/matter` · New page

| Meta | Copy | Chars |
|---|---|---|
| Title | Matter \| Brand Strategy, Identity & Design in Mumbai \| LMR | 58 |
| Description | Brand strategy, storytelling, identity, packaging and social systems from a Mumbai studio that designs for why people buy, not just what looks good. | 148 |
| OG title | Matter: design and brand \| Light Matter Reality | 47 |
| OG description | Strategy, story, identity and packaging. Pretty is easy now. Meaning isn’t. | 75 |

**Keywords:** primary *brand identity design Mumbai* · secondary: brand strategy agency Mumbai, packaging design Mumbai, social media design agency, carousel design

### Hero

**Eyebrow:** Matter · Design and brand  
**Name:** Matter  
**Headline:** What your brand is made of.  
**Body:**  
Strategy, story, identity, packaging and the social systems that carry them. Design that knows why people buy, not just what looks good this week.

### Intro

**Headline:** Pretty is easy now. Meaning isn’t.  
**Body:**  
AI can generate a hundred logos before lunch. None of them will know your buyer, your category, or why people choose you over the shop next door. We start there.

### Services

**Headline:** What Matter makes  

- **Brand strategy**: Positioning, audience, and the one thing you should be known for. Written down, argued for, agreed.
- **Storytelling and narrative**: The story your brand tells in every film, post and pitch. We write it once, properly, and everything else follows it.
- **Identity**: Logo, type, colour and the rules that hold them together. Built to work on a hoarding and on a WhatsApp status.
- **Packaging**: Boxes, pouches and labels that feel like the product inside, from jewellery boxes to retail cartons.
- **Social systems**: Templates, grids and rules, so your feed looks like one brand whoever posts it.
- **Carousels and graphics**: Carousels people read to the last slide, and graphics that don’t look like everyone else’s.

### Buyer psychology

**Headline:** Design that knows why people buy.  
**Body:**  
People don’t decide on beauty alone. They decide on trust, status, the fear of a bad choice, and what their family will say. We design for those, on purpose.

### By industry

**Headline:** Matter, by industry  

- **Jewellery & Fashion**: Identities for jewellers and labels, packaging, festive campaign systems. → `/industries/jewellery-fashion`
- **Real Estate**: Project identities, launch campaign systems, broker and channel-partner kits. → `/industries/real-estate`
- **Architecture & Interiors**: Practice branding, portfolio design, project carousels. → `/industries/architecture-interiors`
- **Pharma**: Brand systems and social graphics, sober enough for medical review. → `/industries/pharma`

### FAQ

**Headline:** Questions  

- **Do you do strategy, or just design?**  
  Both. Strategy comes first and design makes it visible. You can hire us for either, but they work best together.
- **Can you refresh our brand without losing what people know?**  
  Yes. Most established brands need a sharper version of themselves, not a new one. We keep what’s been earned and fix what’s dated.
- **Do you make the content, or just the templates?**  
  Both. We build the system, and on a Studio Retainer we run it for you.
- **How long does an identity project take?**  
  As a guide, [TURNAROUND: identity project, brief to delivery].

### CTA

**Headline:** Make it matter.  
**Body:** Tell us what your brand should stand for. We’ll help you prove it.  
**Primary CTA:** Start a brief → `/contact`  

---

## 3c. Reality

`/reality` · New page

| Meta | Copy | Chars |
|---|---|---|
| Title | Reality \| Websites, 3D Sites & CRM Automation, Mumbai \| LMR | 59 |
| Description | Websites, landing pages, scroll-animated and 3D sites, walkthroughs, custom apps and CRM automation, built to carry your story and catch the lead. | 146 |
| OG title | Reality: web and immersive \| Light Matter Reality | 49 |
| OG description | Websites, 3D sites, walkthroughs and CRM automation. Story at the front, system at the back. | 92 |

**Keywords:** primary *website design Mumbai* · secondary: 3D website design, scroll animation website, landing page design Mumbai, CRM automation, virtual walkthrough

### Hero

**Eyebrow:** Reality · Web and immersive  
**Name:** Reality  
**Headline:** Where your brand becomes a place.  
**Body:**  
Websites, landing pages, scroll-animated and 3D sites, walkthroughs, custom apps and the CRM workflows behind them. The part of the story people can step into, and the part that sells.

### Intro

**Headline:** Your website is the only showroom open at 2am.  
**Body:**  
It’s where your buyer goes after the reel and before the visit. We build it to tell the same story as everything else, then connect it to your sales team so no lead goes cold.

### Services

**Headline:** What Reality makes  

- **Websites**: Brand and business sites that look like the brand and load like a utility.
- **Landing pages**: One page, one job. For launches, campaigns and offers.
- **Scroll-animated and 3D sites**: Semi-immersive sites where the story moves as you scroll. For launches that deserve an entrance.
- **Walkthroughs**: Virtual walkthroughs of finished spaces, and of spaces not yet built, marked as artist’s impressions.
- **Custom apps**: Tools your team or your customers will actually use: catalogues, configurators, booking flows.
- **CRM and workflow automation**: Leads captured, routed, followed up and tracked. Your site, WhatsApp, email and sales team, connected.

### The system behind the story

**Headline:** The story doesn’t end at the enquiry form.  
**Body:**  
Plenty of beautiful websites leak leads. We connect the form to the follow-up: who gets the lead, how fast, what they send, what happens next. Story at the front, system at the back.

### Mobile first

**Headline:** Built for the phone in your buyer’s hand.  
**Body:**  
Most of your buyers will see the site on a mid-range phone, on mobile data. We design immersive work to load fast there first, and impress on a big screen second.

### By industry

**Headline:** Reality, by industry  

- **Jewellery & Fashion**: E-commerce and brand sites, catalogue tools, WhatsApp enquiry flows, store-visit booking. → `/industries/jewellery-fashion`
- **Real Estate**: Project sites, EOI and launch landing pages, walkthroughs, CRM workflows for sales teams and channel partners. → `/industries/real-estate`
- **Architecture & Interiors**: Portfolio sites that look as considered as the work, and enquiry flows that qualify leads. → `/industries/architecture-interiors`
- **Pharma**: Corporate and product portfolio sites, careers pages, training portals. → `/industries/pharma`

### FAQ

**Headline:** Questions  

- **Which platforms do you build on?**  
  Whatever suits the job and the team who’ll run it. We recommend a platform in the proposal. [VERIFY: platforms you support]
- **Can you connect our website to our CRM?**  
  Yes. We set up lead capture, routing and follow-ups in the CRM you use, or help you choose one. [VERIFY: CRMs you support]
- **Will a 3D site be slow?**  
  Not if it’s built properly. We design for a mid-range phone on mobile data first, because that’s how most buyers will see it.
- **Do you look after the site after launch?**  
  Yes, on a Studio Retainer or a maintenance plan. [VERIFY: maintenance terms]

### CTA

**Headline:** Make it real.  
**Body:** Tell us what the site has to do. We’ll build the place, and the system behind it.  
**Primary CTA:** Start a brief → `/contact`  

---

## 4a. Industry: Jewellery & Fashion

`/industries/jewellery-fashion` · New page

| Meta | Copy | Chars |
|---|---|---|
| Title | Jewellery Shoots, Brand Films & AI Lookbooks, Mumbai \| LMR | 58 |
| Description | Jewellery shoots, brand films, festive campaigns and AI lookbooks in Mumbai. Gold that looks like gold, and a world built for every collection. | 143 |
| OG title | Famous on your street. Invisible on their phone. \| LMR | 54 |
| OG description | Shoots, films and festive campaigns for jewellers and boutique fashion studios in Mumbai. | 89 |

**Keywords:** primary *jewellery shoot Mumbai* · secondary: jewellery brand film, jewellery photography Mumbai, AI jewellery photography, festive jewellery campaign, fashion film Mumbai, AI lookbook

### Hero

**Eyebrow:** Jewellery & Fashion  
**Headline:** Famous on your street. Invisible on their phone.  
**Alternate headlines:**

- Gold should look like gold. Even on a phone.
- Show them why it costs what it costs.
- Bridal gold and beachwear silver don’t share a world. We build each its own.
- Dhanteras won’t wait for your shoot.

**Body:**  
Shoots, films and campaigns for jewellery brands, heritage jewellers, online gold, silver and artificial jewellery stores, and boutique fashion studios. Surreal when it should be. Luxurious, always. Never copy-pasted.

**Primary CTA:** Plan your Festive Edit → `/offers#festive-edit`  
**Secondary CTA:** See the work → `/work?industry=jewellery-fashion`  

### Pain, in the owner’s voice

> *Note: Written as the owner’s inner voice and unattributed on purpose. Never present these as client quotes.*

**Eyebrow:** Sound familiar?  
**Headline:** The things owners say after closing time.  

- Everyone in the area knows our shop. Nobody under thirty follows us.
- The new generation decides on the phone. By the time they walk in, they’ve already chosen, from someone else.
- Our gold looks brassy in photos. Our diamonds look like glass.
- We can’t book a model shoot for every collection.
- Every jewellery feed looks the same. Ours included.
- Wedding season is here and we haven’t shot a thing.
- Our pieces take weeks of handwork. On Instagram they look like a print.

### The shift

**Headline:** The shop is still the stage. The phone is the trailer.  
**Body:**  
Your buyer sees your jewellery on a screen long before they touch it, and that first look decides whether they walk in. We make it count: gold that reads as gold, stones that hold their fire, and a story that makes your shop the obvious place to buy.

### Custom worlds

> *Note: Creative directions, not case studies.*

**Headline:** Every collection gets its own world.  
**Body:**  
Beachwear jewellery doesn’t belong on a velvet bust. Bridal gold doesn’t belong on a beach. We build the world from the piece outwards: its mood, its buyer, its occasion. Sometimes that world is real. Sometimes it’s surreal. It’s never a template.

**Examples:**

- **Bridal gold**: Heirloom light, deep reds, ritual and family. Slow, warm, close.
- **Everyday silver**: Daylight, skin, movement. Light enough to wear to work.
- **Beachwear and resort**: Salt, sun and water. A world that feels like the holiday it’s for.
- **Couture and occasionwear**: Fabric in motion, handwork in macro, the hours made visible.

### What we make

**Headline:** What we make for jewellers and fashion studios  
**Groups:**

- **Light**
  - Jewellery shoots: studio and macro photography lit for metal and stone
  - Brand films and festive ad films
  - AI lookbooks: on-model imagery without a model shoot for every collection
  - Reels for Instagram and WhatsApp
  - Catalogue and e-commerce imagery
- **Matter**
  - Collection stories and campaign concepts
  - Brand identity and packaging
  - Social systems that stop your feed looking like everyone else’s
- **Reality**
  - E-commerce and brand websites
  - WhatsApp catalogue and enquiry flows
  - Store-visit booking for bridal and high-value buyers

### Entry offer: Festive Edit

**ID:** `festive-edit`  
**Name:** Festive Edit  
**Pitch:** Festive video ads and stills, ready before the season peaks.  
**Hook:** Dhanteras won’t wait for your shoot.  
**Includes:**

- Campaign concept and story world for one collection
- [QTY] vertical video ads, cut for Reels, Stories and paid ads
- [QTY] campaign stills and statics
- Copy lines in English and [LANGUAGE]
- Every format sized for Instagram, WhatsApp, YouTube Shorts and ads
- [QTY] rounds of revisions

**Turnaround:** [TURNAROUND: working days from approved brief]  
**Price:** ₹[PRICE]  
**Price note:** Exclusive of GST.  
**Booking note:** Book [VERIFY: weeks] weeks before the festival. Dhanteras doesn’t move.  
**CTA:** Plan your Festive Edit → `/contact?offer=festive-edit`  

### Process

**Headline:** From brief to festive feed  
**Steps:**

- **01 Brief**: Your collection, your buyer, your dates. We work back from the festival, not forward from the shoot.
- **02 Narrative**: A world for the collection, a story for the season, and a shot list that serves both.
- **03 Craft**: We shoot your pieces properly, with light built for metal and stone.
- **04 AI acceleration**: Generated worlds, on-model imagery and versions for every format, all judged against the real piece.
- **05 Delivery**: Every asset sized, named and ready to post before the rush.

### FAQ

**Headline:** Questions jewellers ask  

- **Will AI make our jewellery look fake?**  
  Not the way we use it. We shoot your pieces for real, so the metal and stones stay true, and use AI for the world around them. Every frame is checked against the actual piece.
- **Can you make gold and diamonds look real on camera?**  
  That’s the craft. Gold behaves like a mirror and diamonds need controlled light. We light for both, so gold reads warm and stones hold their fire.
- **We can’t afford a model shoot for every collection. Can you help?**  
  Yes. AI lookbooks give you on-model imagery without booking a shoot each time, with the pieces kept accurate and the look consistent with your brand.
- **Do you work with smaller jewellers, or only big brands?**  
  Both. Some of the best stories sit in shops that have owned one neighbourhood for decades. What matters is the appetite to look different.
- **How early should we book for Dhanteras or wedding season?**  
  [VERIFY: weeks] weeks ahead is comfortable. A Festive Edit can move faster, but the earlier the brief, the better the world.
- **Do you work with fashion brands?**  
  With boutique studios, yes, especially those whose pieces need to show why they cost what they cost. Mass garment brands aren’t our focus.

### CTA

**Headline:** Your next collection deserves its own world.  
**Body:** Tell us what you’re launching and when. We’ll tell you what it needs.  
**Primary CTA:** Start a brief → `/contact?industry=jewellery-fashion`  
**Secondary CTA:** Plan your Festive Edit → `/contact?offer=festive-edit`  

---

## 4b. Industry: Real Estate

`/industries/real-estate` · New page

| Meta | Copy | Chars |
|---|---|---|
| Title | Real Estate Video & Launch Campaigns, Mumbai & Thane \| LMR | 58 |
| Description | Launch films, AI visuals, landing pages and CRM workflows for residential projects in Mumbai, Thane and Navi Mumbai, from pre-launch to possession. | 147 |
| OG title | Every tower says luxury. Yours should say why. \| LMR | 52 |
| OG description | End-to-end launch storytelling for residential projects in Mumbai, Thane and Navi Mumbai. | 89 |

**Keywords:** primary *real estate video production Mumbai* · secondary: real estate video production Thane, real estate marketing agency Navi Mumbai, pre-launch campaign real estate Mumbai, real estate walkthrough video, AI visuals for real estate, project launch film

### Hero

**Eyebrow:** Real Estate · Mumbai, Thane, Navi Mumbai  
**Headline:** Every tower says luxury. Yours should say why.  
**Alternate headlines:**

- Ten towers on one road. One story buyers remember.
- Launch like the tower’s already standing.
- From EOI to possession, one story.
- Your EOI opens next month. Your renders don’t.

**Body:**  
End-to-end launch storytelling for residential projects: campaign concept, narrative, films, AI visuals, social, landing pages, websites, and the CRM workflows that turn interest into site visits.

**Primary CTA:** Plan your Launch Story → `/offers#launch-story`  
**Secondary CTA:** See the work → `/work?industry=real-estate`  

### Pain, in the owner’s voice

> *Note: Written as the owner’s inner voice and unattributed on purpose. Never present these as client quotes.*

**Eyebrow:** Sound familiar?  
**Headline:** Heard on every sales floor.  

- Every project on our road calls itself luxury. Buyers can’t tell us apart.
- EOI opens before the renders are ready. We’re asking people to picture a tower nobody can see.
- Our agency takes weeks to turn around a teaser. The launch window doesn’t wait.
- We have dozens of listings and no content for any of them.
- We get leads. Just not the right ones.
- We built a property platform. Now people need a reason to trust it.

### The shift

**Headline:** Ghodbunder Road isn’t Worli.  
**Body:**  
A first-time buyer in Navi Mumbai, a family upgrading in Thane and an NRI deciding from Dubai need different stories, told at different moments. We build one narrative for the project, then tell it to each of them, from the first teaser to the day they get the keys.

### Five stages

**Headline:** One story, five stages.  

- **Pre-launch**: Project brand, narrative and the creative system, ready before the first ad runs.
- **EOI**: Teasers, AI visuals marked as artist’s impressions, landing pages and lead capture.
- **Launch**: The launch film, campaign, website and sales collateral, all telling the same story.
- **Sales**: Content for the long middle: walkthroughs, progress films, broker kits, retargeting creative.
- **Post-sales**: Handover films, possession-day content and referral campaigns. Happy owners sell the next launch.

### RERA

> *Verify: [VERIFY: current MahaRERA advertising requirements with your legal advisor before publishing]*

**Headline:** RERA-ready, by default.  
**Body:**  
Every asset that needs them carries the MahaRERA registration number, QR code and disclaimers. AI visuals are built from approved plans and marked as artist’s impressions. Nothing goes live until your legal team has signed off.

### What we make

**Headline:** What we make for developers, brokers and platforms  
**Groups:**

- **Light**
  - Pre-launch teasers and launch films
  - Walkthrough and lifestyle films
  - AI visuals for projects not yet built, marked as artist’s impressions
  - Construction progress and handover films
  - Listing reels for brokers
- **Matter**
  - Campaign concept and project narrative
  - Project brand identity
  - Brochures and e-brochures
  - Social campaigns
  - Broker and channel-partner kits
- **Reality**
  - Project websites and EOI landing pages
  - 3D and semi-immersive walkthroughs
  - CRM and lead workflows: capture, routing, follow-up, site-visit booking
  - Property platform design

### Who it’s for

**Headline:** Built for every side of the sale  

- **For developers**: One story from pre-launch to possession, and a creative system your sales team, brokers and media can all use.
- **For brokers, mandate firms and channel partners**: You have more listings than content. We build a system that fixes that: listing films, reels and creatives your team can turn around fast, all looking like one brand. On a Studio Retainer, it runs every month.
- **For new property platforms**: Before anyone trusts your listings, they have to trust you. We build the brand, the site and the content that make a new platform feel established from day one.

### Entry offer: Launch Story

**ID:** `launch-story`  
**Name:** Launch Story  
**Pitch:** The EOI narrative, the launch film and a creative system to sell with.  
**Hook:** Your EOI opens next month. Your renders don’t.  
**Includes:**

- Project narrative and campaign concept
- EOI-phase creative: teasers, statics and AI visuals marked as artist’s impressions
- A launch film of [DURATION], with cut-downs
- A creative system: templates for social, ads, brokers and site branding
- MahaRERA details built into every asset that needs them
- [QTY] rounds of revisions

**Add-ons:** Landing page and CRM workflow · 3D walkthrough · Broker and channel-partner kit  
**Turnaround:** [TURNAROUND: working days from approved brief]  
**Price:** ₹[PRICE]  
**Price note:** Exclusive of GST.  
**CTA:** Plan your Launch Story → `/contact?offer=launch-story`  

### Process

**Headline:** From the first teaser to the keys  
**Steps:**

- **01 Brief**: Project, micro-market, buyer, competition, timelines and approvals. We map the launch backwards from EOI.
- **02 Narrative**: One idea the whole project can stand on, tested against every tower on your road.
- **03 Craft**: Films, design and sites, made properly. Shot on site where it’s real, visualised where it isn’t yet.
- **04 AI acceleration**: AI visuals, variations and versions, fast, so the campaign is ready the day the window opens.
- **05 Delivery**: Every asset approved, RERA-checked and ready for media, brokers and your sales floor.

### FAQ

**Headline:** Questions developers ask  

- **Can you make visuals before our renders are ready?**  
  Yes. We build AI visuals from your approved plans, drawings and specifications, and mark them as artist’s impressions. When the final renders arrive, we fold them in.
- **Do you handle RERA requirements?**  
  We build MahaRERA registration numbers, QR codes and disclaimers into every asset that needs them, and nothing goes live without your legal team’s approval. Compliance advice itself should come from your legal advisor.
- **Do you work with brokers and channel partners?**  
  Yes: brokers, brokerage firms, mandate companies and sourcing partners. We build listing content systems and channel-partner kits.
- **Which areas do you cover?**  
  Residential projects in Mumbai, Thane and Navi Mumbai. The focus is deliberate: we know how buyers in each micro-market decide.
- **Do you take on commercial projects?**  
  No. We focus on residential, because that’s the buyer we know best.
- **Can you run our ads and generate leads too?**  
  We make the creative, the landing pages and the CRM workflows. Performance marketing and lead generation come through Growth Partnership, which we offer by invitation after about 90 days of working together.
- **How fast can you turn a launch around?**  
  A Launch Story takes [TURNAROUND: Launch Story]. Tell us your EOI date and we’ll plan backwards from it.

### CTA

**Headline:** Launching soon? Start the story now.  
**Body:** The earlier we start, the more the story can do. Tell us about the project.  
**Primary CTA:** Start a brief → `/contact?industry=real-estate`  
**Secondary CTA:** Plan your Launch Story → `/contact?offer=launch-story`  

---

## 4c. Industry: Architecture & Interiors

`/industries/architecture-interiors` · New page

| Meta | Copy | Chars |
|---|---|---|
| Title | Interior Photography & Architecture Films, Mumbai \| LMR | 55 |
| Description | Interior design photography, architecture films and portfolio websites in Mumbai, so your practice looks as considered as the spaces you create. | 144 |
| OG title | Your spaces look expensive. Your portfolio doesn’t. \| LMR | 57 |
| OG description | Shoots, films and websites for architects and interior designers in Mumbai, Thane and Navi Mumbai. | 98 |

**Keywords:** primary *interior design photography Mumbai* · secondary: architectural photography Mumbai, architecture film, interior designer portfolio website, interior walkthrough video, architecture photography Thane

### Hero

**Eyebrow:** Architecture & Interior Design  
**Headline:** Your spaces look expensive. Your portfolio doesn’t.  
**Alternate headlines:**

- Look as expensive as the spaces you build.
- Finished beautifully. Shot on a phone.
- Referrals built your practice. Your work should grow it.
- Shoot it before the moving truck arrives.

**Body:**  
Shoots, films, graphics and websites for architecture firms, interior design studios and independent designers. Work that looks the way it feels to stand in.

**Primary CTA:** Book a Project Portrait → `/offers#project-portrait`  
**Secondary CTA:** See the work → `/work?industry=architecture-interiors`  

### Pain, in the owner’s voice

> *Note: Written as the owner’s inner voice and unattributed on purpose. Never present these as client quotes.*

**Eyebrow:** Sound familiar?  
**Headline:** Said in every studio, eventually.  

- Clients walk into our spaces and go quiet. On Instagram, the same room gets nothing.
- We finished our best project last year. We never got it shot properly.
- Our portfolio is phone photos and a few renders.
- Every new client is a referral. We don’t know how to find one any other way.
- We’re good designers. We’ve never had to be a brand.

### The shift

**Headline:** The phone flattens everything. We shoot for it anyway.  
**Body:**  
Space is depth, light and material, and a phone screen has none of those. So we shoot with the screen in mind: the right hour, the right lens, the detail that tells a client this was considered. Then we film the walk through it, so they feel the scale.

### The shoot window

**Headline:** There’s a window between the last coat of paint and the first moving truck.  
**Body:**  
Miss it and the space you designed is gone: lived in, rearranged. We help you plan the shoot into the project, so your best work doesn’t survive only in your memory.

**Older projects:** Already handed over? We can often still shoot, with your client’s permission and some careful styling.  

### What we make

**Headline:** What we make for architects and interior designers  
**Groups:**

- **Light**
  - Architectural and interior photography
  - Project films and walkthrough films
  - Material and detail studies
  - Before-and-after and process films
  - AI visualisations to pitch concepts before they’re built
- **Matter**
  - Practice branding and identity
  - Project carousels and social systems
  - Portfolio books and proposal decks
- **Reality**
  - Portfolio websites
  - Enquiry flows that qualify leads before the first call
  - 3D walkthroughs for proposals

### From practice to brand

**Headline:** From practice to brand.  
**Body:**  
Referrals will always matter. But a practice that grows only by word of mouth grows at the speed of its last client’s dinner parties. A portfolio, a site and a feed that look like your work let the right clients find you first.

### Entry offer: Project Portrait

**ID:** `project-portrait`  
**Name:** Project Portrait  
**Pitch:** One finished project, shot and filmed the way it deserves.  
**Hook:** Look as expensive as the spaces you build.  
**Includes:**

- A [DURATION] shoot on site, with light styling
- [QTY] edited photographs
- A [DURATION] project film
- A social set: [QTY] carousels and [QTY] reels cut from the shoot
- Web-ready and print-ready exports

**Turnaround:** [TURNAROUND: working days from the shoot]  
**Price:** ₹[PRICE]  
**Price note:** Exclusive of GST.  
**CTA:** Book a Project Portrait → `/contact?offer=project-portrait`  

### Process

**Headline:** How a project gets its portrait  
**Steps:**

- **01 Brief**: The project, the story behind it, and the clients you want next. That decides what we shoot.
- **02 Narrative**: We plan the walk, the hour and the details, so the shoot tells the project’s story, not just its rooms.
- **03 Craft**: Shot on site, lit for material and depth, styled with care.
- **04 AI acceleration**: Faster edits, clean-ups and versions for every platform. Never invented furniture in a real space.
- **05 Delivery**: Photographs, a film and a social set, ready for your site, your feed and your next pitch.

### FAQ

**Headline:** Questions designers ask  

- **Do you shoot outside Mumbai?**  
  We’re based in Mumbai and shoot across Mumbai, Thane and Navi Mumbai. Further afield on request. [VERIFY: travel policy]
- **Can you shoot a project that’s already been handed over?**  
  Often, yes, with your client’s permission. We restyle lightly and shoot around the life that’s moved in.
- **Do you retouch or add things to a finished space?**  
  We clean up what any good photographer would: cables, clutter, a stray reflection. We don’t add what isn’t there. A portfolio has to be true.
- **Can you help us pitch projects that aren’t built yet?**  
  Yes. AI visualisations and walkthroughs help a client see a concept before you build it, clearly marked as concept visuals.
- **Are you only for big firms?**  
  No. Independent designers often need this most: the work is already there, the brand isn’t yet.

### CTA

**Headline:** Your best project deserves better than your phone.  
**Body:** Tell us about the project and when it’ll be ready. We’ll plan the shoot around the window.  
**Primary CTA:** Book a Project Portrait → `/contact?offer=project-portrait`  
**Secondary CTA:** Start a brief → `/contact?industry=architecture-interiors`  

---

## 4d. Industry: Pharma

`/industries/pharma` · New page

> *Tone: Sober and precise. Medical, legal and regulatory review is part of the process. No therapeutic claims anywhere on this page.*

| Meta | Copy | Chars |
|---|---|---|
| Title | Pharma Explainer Videos & Training Films, India \| LMR | 53 |
| Description | Explainer films, training videos, social and websites for small and mid pharma companies in India. Built from approved claims, inside your review. | 146 |
| OG title | Make the mechanism make sense. \| Light Matter Reality | 53 |
| OG description | Explainer films, training videos and digital for small and mid pharma companies. Precise, reviewed, watchable. | 110 |

**Keywords:** primary *pharma explainer video India* · secondary: MOA animation, medical animation India, pharma training videos, pharma marketing agency Mumbai, pharma website design

### Hero

**Eyebrow:** Pharmaceuticals  
**Headline:** Make the mechanism make sense.  
**Alternate headlines:**

- Serious science. Watchable stories.
- Molecules are hard to watch. We make them easy to follow.
- Precise enough for your medical team. Clear enough for everyone else.
- Small pharma. Modern presence.

**Body:**  
Explainer and ad films, internal training videos, social and websites for small and mid pharma companies. We turn molecules and mechanisms into stories people watch to the end, without adding a claim you haven’t approved.

**Primary CTA:** Start a Molecule Story → `/offers#molecule-story`  
**Secondary CTA:** See the work → `/work?industry=pharma`  

### Pain, in the brand team’s voice

> *Note: Written as the brand team’s inner voice and unattributed on purpose. Never present these as client quotes.*

**Eyebrow:** Sound familiar?  
**Headline:** Heard in every brand review.  

- Our explainer videos are slides with a voice-over.
- The field team never finishes the training modules.
- Our science is current. Our website isn’t.
- Every agency we brief either over-claims or under-delivers.
- Medical review sends everything back, and the agency never understands why.

### The shift

**Headline:** Precision and story aren’t opposites.  
**Body:**  
A mechanism of action already has a shape: a problem, a key, a lock, a change. We find that shape in your science and tell it clearly, so a doctor, a rep or a viewer stays with it to the end.

### Medical review

**Headline:** Built for medical review, not around it.  
**Body:**  
We work only from the claims, references and prescribing information your team approves. Scripts, storyboards and final cuts go through your medical, legal and regulatory reviewers at fixed points, and the timeline is planned around them. We don’t make therapeutic claims. We make your approved ones clear.

**NDA:** NDA before the brief, as standard.  

### Audiences

**Headline:** Different audiences. Different rules.  
**Body:**  
What you can say to a doctor, a field rep, a patient or an investor isn’t the same. Your regulatory team sets the rules. We write to them, one audience at a time.

### What we make

**Headline:** What we make for pharma brand teams  
**Groups:**

- **Light**
  - Mechanism-of-action and medicine explainer films
  - Ad films, where advertising is permitted
  - Internal training videos for field teams and staff
  - Corporate and facility films
- **Matter**
  - Social graphics and strategy
  - Brand systems for product portfolios
  - Conference and sales-meet content
- **Reality**
  - Corporate and product portfolio websites
  - Training portals and internal tools
  - Careers pages that help you hire

### Entry offer: Molecule Story

**ID:** `molecule-story`  
**Name:** Molecule Story  
**Pitch:** An explainer film series that tells the science as a story.  
**Hook:** Make the mechanism make sense.  
**Includes:**

- A science intake session with your medical team
- Narrative and scripts written from your approved claims and references
- Storyboards for review before production
- [QTY] explainer films of [DURATION] each
- Cut-downs for e-detailing, conferences and social
- Medical, legal and regulatory review rounds built into the timeline
- Subtitles in [LANGUAGES]

**Turnaround:** [TURNAROUND: working days from approved script]  
**Price:** ₹[PRICE]  
**Price note:** Exclusive of GST.  
**CTA:** Start a Molecule Story → `/contact?offer=molecule-story`  

### Process

**Headline:** How a Molecule Story gets made  
**Steps:**

- **01 Brief**: Product, audience, approved claims, references and review steps. We agree what can be said before we write a word.
- **02 Narrative**: We find the story in the mechanism and script it for one audience at a time.
- **03 Craft**: 2D and 3D animation, live action and design, made to the standard of a brand film.
- **04 AI acceleration**: Faster storyboards, visual exploration and versions, always checked against the approved science.
- **05 Delivery**: Final cuts approved by your reviewers, in every format and language you need.

### FAQ

**Headline:** Questions brand teams ask  

- **Will you make claims about our product?**  
  No. We work only from claims and references your medical team has approved. Our job is to make them clear, not bigger.
- **How do you handle medical, legal and regulatory review?**  
  We plan for it. Review points sit in the timeline at script, storyboard and final cut, so approvals don’t turn into delays.
- **Can you make content for doctors and for patients?**  
  We make content for healthcare professionals, field teams and the public. What can be said to each is decided by your regulatory team, and we write to that brief.
- **Do you sign NDAs?**  
  Yes, before the brief. Your pipeline and data stay confidential.
- **Can the films be used for e-detailing?**  
  Yes. Every series includes cut-downs and formats for tablets, conferences and social. [VERIFY: delivery formats]
- **Do you work in Indian languages?**  
  Yes. English, Hindi and [VERIFY: other languages], with subtitles or voice-over.

### CTA

**Headline:** Have a mechanism that deserves a better story?  
**Body:** Tell us about the product and the audience. We’ll show you the story inside the science.  
**Primary CTA:** Start a Molecule Story → `/contact?offer=molecule-story`  
**Secondary CTA:** Start a brief → `/contact?industry=pharma`  

---

## 5. How We Work

`/how-we-work` · New page

| Meta | Copy | Chars |
|---|---|---|
| Title | How We Work \| Process & Engagement Models \| LMR | 47 |
| Description | Brief, narrative, craft, AI acceleration, delivery. How LMR works, and four ways to engage: retainer, strategy and execution, projects, and growth. | 147 |
| OG title | Story first. Tools second. \| Light Matter Reality | 49 |
| OG description | Five stages, four engagement models, and exactly where AI fits. | 63 |

**Keywords:** primary *creative agency process* · secondary: content retainer agency Mumbai, creative retainer Mumbai, AI content production process

### Hero

**Eyebrow:** How we work  
**Headline:** Story first. Tools second. Always in that order.  
**Body:**  
Every project at LMR moves through the same five stages. AI shows up in the fourth, not the first. That’s the point.

### Process

**Headline:** Five stages  
**Steps:**

- **01 Brief: We find out what you’re really selling.**  
  A working session on your business, your buyer, your competition and your deadlines. Festive dates, RERA approvals, medical review: we put the constraints on the table first.
  - You get: A written brief we both sign off.
  - We need: An hour of your time, your numbers if you’ll share them, and honesty about what hasn’t worked.
- **02 Narrative: We write the story before we touch a tool.**  
  Concept, narrative, scripts, moodboards and the visual world. This is where taste does its work, and where most of the value is decided.
  - You get: A concept and a script or storyboard to approve.
  - We need: One decision-maker, and feedback in one voice.
- **03 Craft: Then we make it properly.**  
  Direction, shoots, design, edit, sound and grade. On the ground when the product has to be real, with the crew to do it.
  - You get: Work in progress at agreed checkpoints.
  - We need: Access to the product, the site and the people who know them.
- **04 AI acceleration: AI where it saves time. Never where it costs taste.**  
  Generated worlds, variations, visuals before renders exist, cut-downs and language versions. Every frame is judged by the same people who’d judge a real one.
  - You get: More range, sooner, at the same standard.
  - We need: Nothing extra. You’ll know where AI was used.
- **05 Delivery: Every format, on time, ready to go live.**  
  Masters, cut-downs and sizes for every platform, named and organised. Then we look at what worked and feed it into the next brief.
  - You get: Final files and usage notes.
  - We need: Final sign-off.

### Where AI fits

**Headline:** What AI does here. And what it doesn’t.  
**AI does:**

- Build worlds without building sets
- Show a project before the renders exist
- Explore more directions before you commit
- Make cut-downs, resizes and language versions
- Speed up edits, clean-ups and storyboards

**AI doesn’t:**

- Choose the story
- Decide what’s on-brand
- Know what your buyer fears
- Sign off a frame
- Replace a real shoot when the product has to be true

**Line:** You’ll always know where AI was used.  

### Engagement models

**ID:** `engagements`  
**Headline:** Four ways to work with us.  
**Intro:** Three are open to everyone. The fourth is earned.  

#### Studio Retainer

**Line:** Your content partner, end to end.  
**Body:**  
We become your studio: strategy, shoots, design, films and web, planned monthly and delivered on a rhythm. The longer we work together, the sharper it gets.

**Best for:**  
Brands with a steady calendar: jewellers through festive and wedding seasons, developers across launches, pharma brand teams through the year.

**Includes:**

- A monthly content plan
- Production across Light, Matter and Reality
- A standing team that knows your brand
- A monthly look at what worked, and what’s next

**CTA:** Talk about a retainer → `/contact?engagement=retainer`  

#### Strategy + Execution

**Line:** We set the direction, then we make it.  
**Body:**  
For brands that know something has to change, but not what. We define your digital strategy (positioning, story, channels, content), then execute it, so the plan doesn’t die in a deck.

**Best for:** Heritage businesses going digital, new launches, brands that have outgrown their agency.  
**Includes:**

- Positioning and narrative
- Channel and content strategy
- A production roadmap
- Execution by the same studio

**CTA:** Talk about strategy → `/contact?engagement=strategy`  

#### Project / Production

**Line:** One brief. Fixed scope. Done properly.  
**Body:**  
A defined piece of work at a defined price: twenty product images, five festive video ads, a brand film, a landing page. Clear in, clear out.

**Best for:** A first project together, a campaign, a launch moment.  
**Includes:**

- A fixed scope and price
- A clear timeline
- Agreed review rounds

**CTA:** Scope a project → `/contact?engagement=project`  

#### Growth Partnership (By invitation)

**Line:** Layer two. Revenue, alongside you.  
**Body:**  
Performance marketing, lead generation and sales, run alongside your team, with the same story carried into every ad and every lead. We offer it only to clients we’ve worked with for about 90 days, once we know the brand well enough to put our name to its numbers.

**Footnote:** It isn’t on the pricing page. That’s the point.  
**How it starts:**  
Start on any other model. If the work is working and the fit is right, around the 90-day mark, we’ll raise it with you.

> *Growth Partnership: No CTA on Growth Partnership, on purpose: it’s offered, never applied for. The contact form leaves it out too.*

### FAQ

**Headline:** Questions  

- **Which model should we start with?**  
  Most clients start with a project or an entry offer. It’s the quickest way to see how we think. Retainers usually follow.
- **Do you work outside your four industries?**  
  Occasionally, when the brief is right. Our depth is in jewellery and fashion, real estate, architecture and interiors, and pharma.
- **Can we apply for Growth Partnership?**  
  No. It’s offered, not applied for, after about 90 days of working together.
- **How do you price?**  
  By scope. Entry offers have fixed prices. Retainers and projects are quoted after the brief. [VERIFY: pricing approach]
- **Will we know where AI was used?**  
  Yes. We tell you where AI was used in anything we deliver.
- **Who will we work with?**  
  The studio. You get one point of contact and the whole team behind it. There are no names on the website, but you’ll always know who to call.

### CTA

**Headline:** Start with a brief.  
**Body:** Tell us where you are and where you want to be. We’ll recommend the right way in.  
**Primary CTA:** Start a brief → `/contact`  

---

## 6. Offers

`/offers` · New page

| Meta | Copy | Chars |
|---|---|---|
| Title | Entry Offers \| Festive Edit, Launch Story & More \| LMR | 54 |
| Description | Four fixed-scope ways to start with LMR: Festive Edit, Launch Story, Project Portrait and Molecule Story. Clear scope, clear price, quick turnaround. | 149 |
| OG title | Four ways to start \| Light Matter Reality | 41 |
| OG description | Festive Edit, Launch Story, Project Portrait and Molecule Story. Fixed scope, one industry each. | 96 |

**Keywords:** primary *creative production packages Mumbai* · secondary: festive jewellery campaign, real estate launch campaign, architecture photography package, pharma explainer video series

### Hero

**Eyebrow:** Offers  
**Headline:** Four ways to start. Each one done properly.  
**Body:**  
Fixed scope, fixed price, one industry each. The quickest way to see how the studio thinks before you commit to more.

### The offers

> *Note: Same scope as each industry page’s offer block. Keep them in sync.*

#### Festive Edit

**ID:** `festive-edit`  
**Industry:** Jewellery & Fashion  
**For:**  
Jewellers, jewellery e-commerce brands and boutique fashion studios with a festive or wedding-season collection.

**Pitch:** Festive video ads and stills, ready before the season peaks.  
**Hook:** Dhanteras won’t wait for your shoot.  
**Includes:**

- Campaign concept and story world for one collection
- [QTY] vertical video ads, cut for Reels, Stories and paid ads
- [QTY] campaign stills and statics
- Copy lines in English and [LANGUAGE]
- Every format sized for Instagram, WhatsApp, YouTube Shorts and ads
- [QTY] rounds of revisions

**Turnaround:** [TURNAROUND: working days from approved brief]  
**Price:** ₹[PRICE]  
**Price note:** Exclusive of GST.  
**CTA:** Plan your Festive Edit → `/contact?offer=festive-edit`  

#### Launch Story

**ID:** `launch-story`  
**Industry:** Real Estate  
**For:** Developers and their sales teams launching a residential project in Mumbai, Thane or Navi Mumbai.  
**Pitch:** The EOI narrative, the launch film and a creative system to sell with.  
**Hook:** Your EOI opens next month. Your renders don’t.  
**Includes:**

- Project narrative and campaign concept
- EOI-phase creative: teasers, statics and AI visuals marked as artist’s impressions
- A launch film of [DURATION], with cut-downs
- A creative system: templates for social, ads, brokers and site branding
- MahaRERA details built into every asset that needs them
- [QTY] rounds of revisions

**Add-ons:** Landing page and CRM workflow · 3D walkthrough · Broker and channel-partner kit  
**Turnaround:** [TURNAROUND: working days from approved brief]  
**Price:** ₹[PRICE]  
**Price note:** Exclusive of GST.  
**CTA:** Plan your Launch Story → `/contact?offer=launch-story`  

#### Project Portrait

**ID:** `project-portrait`  
**Industry:** Architecture & Interiors  
**For:** Architects and interior designers with a finished project that deserves better than phone photos.  
**Pitch:** One finished project, shot and filmed the way it deserves.  
**Hook:** Look as expensive as the spaces you build.  
**Includes:**

- A [DURATION] shoot on site, with light styling
- [QTY] edited photographs
- A [DURATION] project film
- A social set: [QTY] carousels and [QTY] reels cut from the shoot
- Web-ready and print-ready exports

**Turnaround:** [TURNAROUND: working days from the shoot]  
**Price:** ₹[PRICE]  
**Price note:** Exclusive of GST.  
**CTA:** Book a Project Portrait → `/contact?offer=project-portrait`  

#### Molecule Story

**ID:** `molecule-story`  
**Industry:** Pharma  
**For:** Brand and marketing teams at small and mid pharma companies with a product that needs explaining.  
**Pitch:** An explainer film series that tells the science as a story.  
**Hook:** Make the mechanism make sense.  
**Includes:**

- A science intake session with your medical team
- Narrative and scripts written from your approved claims and references
- Storyboards for review before production
- [QTY] explainer films of [DURATION] each
- Cut-downs for e-detailing, conferences and social
- Medical, legal and regulatory review rounds built into the timeline
- Subtitles in [LANGUAGES]

**Turnaround:** [TURNAROUND: working days from approved script]  
**Price:** ₹[PRICE]  
**Price note:** Exclusive of GST.  
**CTA:** Start a Molecule Story → `/contact?offer=molecule-story`  

### Closing

**Headline:** Need something else?  
**Body:** The offers are a way in, not a limit. Most lead to a longer engagement. None of them require one.  
**Primary CTA:** Start a brief → `/contact`  

---

## 7. Work

`/work` · New page

| Meta | Copy | Chars |
|---|---|---|
| Title | Work \| Films, Brands & Websites \| Light Matter Reality | 54 |
| Description | Selected films, shoots, brands and websites from LMR, an AI-led creative studio in Mumbai, across jewellery, real estate, architecture and pharma. | 146 |
| OG title | No faces. Just the work. \| Light Matter Reality | 47 |
| OG description | Selected films, shoots, brands and websites from a Mumbai creative studio. | 74 |

**Keywords:** primary *creative studio portfolio Mumbai* · secondary: brand film portfolio, jewellery campaign case study, real estate launch case study, AI ad film examples

### Hero

**Eyebrow:** Work  
**Headline:** No faces. Just the work.  
**Body:**  
Concepts we made to test an idea, and client work made to a brief. Every piece is tagged, so you always know which is which.

### Filters

**Label:** Filter  
**All:** All work  
**Services:** Light · Matter · Reality  
**Industries:** Jewellery & Fashion · Real Estate · Architecture & Interiors · Pharma  
**Types:** Concept · Client work  
**Clear:** Clear filters  
**Empty:** Nothing here yet. It’s still in the edit.  

### Tag definitions


- **Concept**: Self-initiated. Made to test an idea.
- **Client work**: Made to a real brief. Shared with permission.

### Section intros

**Services:**

- **Light**: Films and photography.
- **Matter**: Brands, identities and systems.
- **Reality**: Websites and immersive.

**Industries:**

- **Jewellery & Fashion**: Worlds built for collections.
- **Real Estate**: Launches told as one story.
- **Architecture & Interiors**: Spaces, shown properly.
- **Pharma**: Science, watched to the end.

### Case study template

*app/work/[slug]/page.tsx (suggested)*

**Meta template: [Project title] | Work | LMR**

**Description:** [One line on what we made and for whom]. A [Light / Matter / Reality] project by Light Matter Reality, Mumbai.  

**Labels:** Industry: Industry · Services: Services · Type: Type · Year: Year · Challenge: Challenge · Story: Story · Output: Output · Result: Result · Credits: Made by · Next: Next project  

**Template: [CASE STUDY PLACEHOLDER: project title]**

**Industry:** [CASE STUDY PLACEHOLDER: industry]  
**Services:** [CASE STUDY PLACEHOLDER: Light / Matter / Reality]  
**Type:** [CASE STUDY PLACEHOLDER: Concept or Client work]  
**Year:** [YEAR]  
**Challenge:** [CASE STUDY PLACEHOLDER: the business problem in two sentences, in the client’s terms]  
**Story:** [CASE STUDY PLACEHOLDER: the idea, and why it fitted this buyer]  
**Output:** [CASE STUDY PLACEHOLDER: what we made, for example one brand film, 24 stills and a landing page]  
**Result:** [CASE STUDY PLACEHOLDER: verified results only, with the source and the time period]  
**Credits:**  
Light Matter Reality: [CASE STUDY PLACEHOLDER: disciplines, for example direction, cinematography, edit, design]

**Rules:**

- Lead with the buyer’s problem, not our process.
- Results only if they’re verified, with a source and a time period. If there are none, end on the output.
- Describe clients by category and place, such as ‘a heritage jeweller in Thane’. Name them only with written permission.
- Credit disciplines, never people.
- Concept work is always tagged Concept.

**Slots:**

- [CASE STUDY PLACEHOLDER: jewellery & fashion flagship]
- [CASE STUDY PLACEHOLDER: real estate flagship]
- [CASE STUDY PLACEHOLDER: architecture & interiors flagship]
- [CASE STUDY PLACEHOLDER: pharma flagship]
- [CASE STUDY PLACEHOLDER: jewellery & fashion 01]
- [CASE STUDY PLACEHOLDER: jewellery & fashion 02]
- [CASE STUDY PLACEHOLDER: real estate 01]
- [CASE STUDY PLACEHOLDER: real estate 02]
- [CASE STUDY PLACEHOLDER: architecture & interiors 01]
- [CASE STUDY PLACEHOLDER: pharma 01]
- [CASE STUDY PLACEHOLDER: pharma 02]

### CTA

**Headline:** Like what you see? Bring us the brief.  
**Primary CTA:** Start a brief → `/contact`  

---

## 8. Journal

`/journal` · New page

| Meta | Copy | Chars |
|---|---|---|
| Title | Journal \| Teardowns on Craft, Brand and AI \| LMR | 48 |
| Description | Teardowns and field notes on jewellery shoots, real estate launches, architecture films, pharma explainers and AI, from a Mumbai creative studio. | 145 |
| OG title | Notes from the edit suite \| Light Matter Reality | 48 |
| OG description | Teardowns, field notes and working methods from the studio. | 59 |

**Keywords:** primary *brand storytelling insights* · secondary: jewellery photography tips, real estate marketing Mumbai, pharma explainer video, AI in advertising India

### Hero

**Eyebrow:** Journal  
**Headline:** Notes from the edit suite.  
**Body:** Teardowns, field notes and working methods from the studio. What works, what doesn’t, and why.  

### Labels

**Categories:** Teardown · Field notes · Craft · AI  
**Byline:** By the studio  
**Read time:** [N] min read  
**Read more:** Read  
**All:** All articles  
**Empty:** New notes are in the edit.  

### Newsletter

**Headline:** New notes, now and then.  
**Body:** One email when something new is published. Nothing else.  
**Placeholder:** you@yourbrand.com  
**Button:** Subscribe  
**Success:** You’re on the list.  
**Error:** That email doesn’t look right.  

### Article template

*app/journal/[slug]/page.tsx (suggested)*

**Meta template: [Article title] | LMR Journal**

**Description:** [The article’s one-line summary, under 155 characters]  

### The first twelve articles

1. **Why gold looks fake on camera, and how to light it so it doesn’t**  
    Gold is a mirror. Most shoots light the piece and forget the room it reflects. A lighting teardown for jewellers.  
    *Teardown · Jewellery & Fashion · keyword: jewellery photography · `/journal/why-gold-looks-fake-on-camera`*
2. **The festive calendar for jewellery brands: what to shoot, and when**  
    Dhanteras, Akshaya Tritiya, Gudi Padwa, wedding season. A working plan for shooting ahead of the rush, not during it.  
    *Field notes · Jewellery & Fashion · keyword: festive jewellery campaign · `/journal/festive-calendar-for-jewellery-brands`*
3. **Show them why it costs what it costs: filming handwork for boutique fashion**  
    Weeks of embroidery can look like a print on a phone. How to film the details that justify a price, without a model shoot for every collection.  
    *Craft · Jewellery & Fashion · keyword: fashion film Mumbai · `/journal/filming-handwork-for-boutique-fashion`*
4. **Selling a tower that isn’t built yet: a pre-launch playbook for Mumbai**  
    What to make before the renders are ready, what has to wait for RERA registration, and how to build a story that lasts to possession.  
    *Field notes · Real Estate · keyword: pre-launch campaign real estate Mumbai · `/journal/pre-launch-playbook-mumbai`*
5. **Ghodbunder Road isn’t Worli: why one launch strategy won’t fit every micro-market**  
    Buyers in Thane, Navi Mumbai and Worli weigh different things. Notes on matching the story to the street.  
    *Field notes · Real Estate · keyword: real estate marketing agency Thane · `/journal/ghodbunder-road-isnt-worli`*
6. **Every brochure says luxury. Here’s what buyers actually remember.**  
    A teardown of launch language in residential real estate, and what to say when every tower on the road sounds the same.  
    *Teardown · Real Estate · keyword: real estate launch campaign · `/journal/every-brochure-says-luxury`*
7. **Shoot it before the moving truck: planning interior photography into the project**  
    The window between finishing a space and handing it over is short. How architects and interior designers can plan for the shoot from day one.  
    *Field notes · Architecture & Interiors · keyword: interior design photography Mumbai · `/journal/shoot-before-the-moving-truck`*
8. **Why architecture looks average on a phone, and what fixes it**  
    The wrong hour, the wrong lens, too much in the frame. A teardown of portfolio photos, and what a proper architectural shoot does differently.  
    *Teardown · Architecture & Interiors · keyword: architectural photography Mumbai · `/journal/why-architecture-looks-average-on-a-phone`*
9. **Molecules don’t trend: telling a mechanism of action as a story**  
    How to turn an MOA into a film a doctor or a field rep will watch to the end, without adding a single unapproved claim.  
    *Craft · Pharma · keyword: pharma explainer video India · `/journal/molecules-dont-trend`*
10. **Training videos field teams actually finish**  
    Short, structured, watchable. How to build pharma training modules people complete, and remember in front of a doctor.  
    *Field notes · Pharma · keyword: pharma training videos · `/journal/training-videos-field-teams-finish`*
11. **Taste can’t be prompted: what AI still can’t do in a brand film**  
    Where AI genuinely speeds up production, and the decisions it still can’t make for you.  
    *AI · Studio · keyword: AI ad films · `/journal/what-ai-cant-do-in-a-brand-film`*
12. **AI product photography: when it works, and when it looks cheap**  
    A practical guide for brands choosing between a real shoot, AI imagery, or both. The honest answer is usually both.  
    *AI · Studio · keyword: AI product photography · `/journal/ai-product-photography-when-it-works`*

---

## 9. Contact / Start a Brief

`/contact` · New page

| Meta | Copy | Chars |
|---|---|---|
| Title | Start a Brief \| Contact Light Matter Reality, Mumbai | 52 |
| Description | Tell us what you’re launching, selling or fixing. Start a brief with LMR, an AI-led creative studio in Mumbai. We read every brief properly. | 140 |
| OG title | Start a brief \| Light Matter Reality | 36 |
| OG description | Tell us what you’re launching, selling or fixing. | 49 |

**Keywords:** primary *creative agency Mumbai contact* · secondary: hire a creative studio Mumbai, brand film quote Mumbai, real estate marketing agency Mumbai

### Hero

**Eyebrow:** Contact  
**Headline:** Start a brief.  
**Body:**  
Tell us what you’re launching, selling or fixing. The studio reads every brief properly and replies within [TURNAROUND: response time].

### Brief form

> *Note: Prefill from the query string: ?offer= selects the matching entry offer under ‘What do you need?’, ?industry= selects the industry, ?engagement= selects the engagement.*

**Title:** The brief  
**Required note:** Everything is required unless it’s marked optional.  

| Field | Label | Placeholder | Helper | Required | Error |
|---|---|---|---|---|---|
| `name` | Your name | Full name |  | Yes | We need a name to reply to. |
| `company` | Brand or company | As your customers know it |  | Yes | Tell us which brand this is for. |
| `role` | Your role | Owner, marketing head, brand manager… |  | Optional |  |
| `email` | Email | you@yourbrand.com |  | Yes | We need an email to reply to. / Invalid: That email doesn’t look right. |
| `phone` | Phone or WhatsApp | +91 | We’ll message before we call. | Yes | Add a number we can reach you on. / Invalid: That number looks incomplete. Include the country code if you’re outside India. |
| `city` | City | Choose one |  | Optional |  |
| `industry` | Industry | Choose the closest |  | Yes | Pick the closest one, or choose Something else. |
| `services` | What do you need? |  | Pick all that apply. | Yes | Pick at least one, or choose Not sure yet. |
| `engagement` | How would you like to work? | Choose one | Growth Partnership is by invitation, so it isn’t listed. | Optional |  |
| `budget` | Budget range | Choose a range | The project total, or the monthly figure for a retainer. A rough range is fine: it helps us propose the right scope. | Yes | Pick a range, or choose Not sure yet. |
| `timeline` | When do you need it? | Choose one |  | Yes | Pick the closest timeline. |
| `keyDate` | Key date |  | The festival, EOI, launch or conference date, if there is one. | Optional |  |
| `message` | Tell us the story so far | What are you making, launching or fixing? What’s worked, what hasn’t, and what would success look like? | A few lines is plenty. | Yes | Tell us a little about the project. A line or two is enough. |
| `links` | Links | Website, Instagram, a Drive folder | Anything that shows us where you are now. | Optional |  |
| `source` | How did you find us? | Choose one |  | Optional |  |
| `nda` | We’d like an NDA before sharing details. |  |  | Optional |  |
| `consent` | Yes, LMR may store these details to reply to this brief. Read the privacy policy. |  |  | Yes | Please tick this so we can store your brief and reply. |

**Options, City**

- Mumbai
- Thane
- Navi Mumbai
- Elsewhere in India
- Outside India

**Options, Industry**

- Jewellery brand or store
- Jewellery e-commerce
- Boutique fashion studio
- Real estate developer
- Broker, mandate or channel-partner firm
- Property platform
- Architecture firm
- Interior design studio or independent designer
- Pharma company
- Something else

**Options, What do you need?**

- Light: Brand or ad film · Reels and short-form · Product or space photography · AI video or AI product imagery
- Matter: Brand strategy and storytelling · Identity or packaging · Social content and carousels
- Reality: Website or landing page · 3D site or walkthrough · CRM or workflow automation · Custom app
- Entry offers: Festive Edit · Launch Story · Project Portrait · Molecule Story
- Other: Not sure yet. Help us work it out.

**Options, How would you like to work?**

- Studio Retainer
- Strategy + Execution
- A single project
- Not sure yet

**Options, Budget range**

- Under ₹1 lakh
- ₹1–3 lakh
- ₹3–7 lakh
- ₹7–15 lakh
- ₹15 lakh and above
- Not sure yet

> *Verify: [VERIFY: budget bands and minimum engagement]*

**Options, When do you need it?**

- As soon as possible
- Within 2 weeks
- Within a month
- In 1–3 months
- Tied to a date (festival, launch, conference)
- Just exploring

**Options, How did you find us?**

- Instagram
- LinkedIn
- Google
- A referral
- The Journal
- Somewhere else

**Submit:** Send brief  
**Sending:** Sending…  

**Success: Brief received.**

**Body:**  
Thank you. We read every brief properly, so give us [TURNAROUND: response time]. If your date is very close, WhatsApp us on [VERIFY: WhatsApp number].

**CTA:** See the work while you wait → `/work`  

**Error: That didn’t send.**

**Body:** Something went wrong on our side. Try again in a moment, or email the brief to [VERIFY: studio email].  

**Offline:** You seem to be offline. Reconnect, then send it again.  

### Beside the form

**Title:** Prefer to write?  
**Email:** [VERIFY: studio email]  
**WhatsApp:** [VERIFY: WhatsApp number]  
**Studio:** Mumbai, India.  
**Hours:** [VERIFY: working hours, for example Monday to Saturday, 10am to 7pm IST]  
**NDA:** Need an NDA first? Tick the box and we’ll send one before you share anything.  
**Humans:** Every brief is read by the studio. Not a bot.  

---

## 10. Global

`Every page` · Shared copy

### Brand

***Live** · content/brand.ts › brand (BrandLockup.tsx; descriptor also renders as the MassField frame label)*

**Name:** Light Matter Reality  
**Short name:** LMR  
**Descriptor:** Creative Studio  
**Descriptor (long):** AI-led creative studio  
**Location:** Mumbai, India  
**One-liner:**  
An AI-led creative studio in Mumbai, built by people who learnt film, design and brand before AI made it look easy.

**Boilerplate:**  
Light Matter Reality (LMR) is an AI-led creative studio in Mumbai. Its three practices, Light (film and photography), Matter (design and brand) and Reality (web and immersive), serve jewellery and fashion, real estate, architecture and interiors, and pharma. Craft comes first. AI makes it faster.

### Taglines

***New***

**Primary:** Taste can’t be prompted.  
**Alternates:**

- We did it the hard way first.
- Crafted by people. Accelerated by AI.

**Usage:**

- **Taste can’t be prompted.** Hero, social bios, default share text, footer sign-off.
- **We did it the hard way first.** Proof section, Studio page, and ads aimed at people who’ve been burnt by cheap AI work.
- **Crafted by people. Accelerated by AI.** Wherever clarity beats wit: proposals, LinkedIn, directory listings.

### Services

***New***

> *Note: Canonical names for the three practices. The homepage shows them as words in MassField (see home › servicesAndIndustries).*

**Line:** Light is how you’re seen. Matter is what you’re made of. Reality is where it all works.  

- **Light: Film and photography** · Key: `light` · Short: How you’re seen. → `/light`
- **Matter: Design and brand** · Key: `matter` · Short: What you’re made of. → `/matter`
- **Reality: Web and immersive** · Key: `reality` · Short: Where it all works. → `/reality`

### Industries

***Live (name) / New (the rest)** · name → content/verticals.ts (renders in FlagshipStage, MassField and StringChapter). navLabel and fullName are for the nav, pages and meta.*

> *Note: Vertical ids follow the brief’s order, as content/verticals.ts asks. The display name for vertical 03 is ‘Architecture’ because ‘Architecture & Interiors’ flattens the MassField curve to 17% of its swing (measured). The palette assignment is unchanged; if you’d rather match the board’s moods, Coral (warm, sophisticated, artistic) suits jewellery and fashion and Citrus (fresh, distinctive, contemporary) suits pharma. That’s a design call, so it isn’t made here.*


- **Jewellery & Fashion** · Vertical id: `solar` · Slug: `jewellery-fashion` · Nav label: Jewellery & Fashion · Full name: Jewellery & Fashion → `/industries/jewellery-fashion`
- **Real Estate** · Vertical id: `cobalt` · Slug: `real-estate` · Nav label: Real Estate · Full name: Residential Real Estate → `/industries/real-estate`
- **Architecture** · Vertical id: `citrus` · Slug: `architecture-interiors` · Nav label: Architecture & Interiors · Full name: Architecture & Interior Design → `/industries/architecture-interiors`
- **Pharma** · Vertical id: `coral` · Slug: `pharma` · Nav label: Pharma · Full name: Pharmaceuticals → `/industries/pharma`

### Nav

***New***

**Logo label (assistive tech):** Light Matter Reality, home  
**Skip link:** Skip to content  
**Primary:**

- Work → `/work`
- Light → `/light`
- Matter → `/matter`
- Reality → `/reality`
- Industries *(opens industriesMenu)*
- Studio → `/studio`

> *Industries: ‘Industries’ opens industriesMenu. There’s no industries index page in the sitemap.*

**Industries menu:**

- Jewellery & Fashion → `/industries/jewellery-fashion`
- Real Estate → `/industries/real-estate`
- Architecture & Interiors → `/industries/architecture-interiors`
- Pharma → `/industries/pharma`

**CTA:** Start a brief → `/contact`  
**Minimal:**

- Work → `/work`
- Studio → `/studio`
- Contact → `/contact`

> *Minimal header: The palette board’s header has three links. If the header stays that quiet, use `minimal` and let the menu carry the rest.*

**Menu**

**Open:** Menu  
**Close:** Close  
**Groups:**

- **Services**
  - Light (Film and photography) → `/light`
  - Matter (Design and brand) → `/matter`
  - Reality (Web and immersive) → `/reality`
- **Industries**
  - Jewellery & Fashion → `/industries/jewellery-fashion`
  - Real Estate → `/industries/real-estate`
  - Architecture & Interiors → `/industries/architecture-interiors`
  - Pharma → `/industries/pharma`
- **Studio**
  - Manifesto → `/studio`
  - How we work → `/how-we-work`
  - Offers → `/offers`
  - Work → `/work`
  - Journal → `/journal`
- **Contact**
  - Start a brief → `/contact`

### Footer

***New***

**Signoff:** Taste can’t be prompted.  
**About:**  
Light Matter Reality is an AI-led creative studio in Mumbai. Film, design and web for jewellery and fashion, real estate, architecture and interiors, and pharma.

**Faceless:** No faces. Just the work.  
**Columns:**

- **Services**
  - Light → `/light`
  - Matter → `/matter`
  - Reality → `/reality`
- **Industries**
  - Jewellery & Fashion → `/industries/jewellery-fashion`
  - Real Estate → `/industries/real-estate`
  - Architecture & Interiors → `/industries/architecture-interiors`
  - Pharma → `/industries/pharma`
- **Studio**
  - Manifesto → `/studio`
  - How we work → `/how-we-work`
  - Offers → `/offers`
  - Work → `/work`
  - Journal → `/journal`
- **Contact**
  - Start a brief → `/contact`
  - [VERIFY: studio email] → `mailto:[VERIFY: studio email]`
  - WhatsApp → `[VERIFY: WhatsApp link]`

**Location:** Mumbai, India.  
**Visits:** Studio visits by appointment. [VERIFY: keep only if there’s a space to visit]  
**Social:**

- Instagram → `[VERIFY: Instagram URL]`
- LinkedIn → `[VERIFY: LinkedIn URL]`
- YouTube → `[VERIFY: YouTube URL]`
- Behance → `[VERIFY: Behance URL]`

**Legal:**

- Privacy policy → `/privacy`
- Terms → `/terms`
- Cookie settings → `#cookies`

**Copyright:** © [YEAR] [VERIFY: legal entity name]. All rights reserved.  
**Made in:** Made in Mumbai. The hard way first.  
**Back to top:** Back to top  

### CTA library

***New***

> *Note: One label per job, so the same action reads the same everywhere.*

| Key | Copy |
|---|---|
| `startBrief` | Start a brief |
| `sendBrief` | Send brief |
| `exploreWork` | Explore work |
| `seeWork` | See the work |
| `viewProject` | View project |
| `nextProject` | Next project |
| `readManifesto` | Read the manifesto |
| `seeHowWeWork` | See how we work |
| `seeEngagements` | See how engagements work |
| `seeOffers` | See all offers |
| `seeOffer` | See the offer |
| `talkToStudio` | Talk to the studio |
| `emailStudio` | Email the studio |
| `whatsappStudio` | WhatsApp the studio |
| `exploreLight` | Explore Light |
| `exploreMatter` | Explore Matter |
| `exploreReality` | Explore Reality |
| `festiveEdit` | Plan your Festive Edit |
| `launchStory` | Plan your Launch Story |
| `projectPortrait` | Book a Project Portrait |
| `moleculeStory` | Start a Molecule Story |
| `readArticle` | Read the article |
| `allArticles` | All articles |
| `backHome` | Back to home |

### Interface microcopy

***New***

| Key | Copy |
|---|---|
| `video.play` | Play |
| `video.pause` | Pause |
| `video.soundOn` | Sound on |
| `video.mute` | Mute |
| `video.replay` | Watch again |
| `video.captions` | Captions |
| `breadcrumbLabel` | Breadcrumb |
| `breadcrumbHome` | Home |
| `pagination.previous` | Previous |
| `pagination.next` | Next |
| `pagination.page` | Page |
| `share.label` | Share |
| `share.copyLink` | Copy link |
| `share.copied` | Link copied |
| `article.byline` | By the studio |
| `article.readTime` | [N] min read |
| `article.published` | Published |
| `article.updated` | Updated |
| `article.related` | Keep reading |
| `tags.concept` | Concept |
| `tags.clientWork` | Client work |
| `loading` | Loading |
| `required` | Required |
| `optional` | Optional |
| `externalLink` | Opens in a new tab |
| `scrollCue` | Scroll |

### Not found

***New** · app/not-found.tsx*

**Meta title:** Page not found | Light Matter Reality  
**Meta description:** This page didn’t make the final cut. The work is still here.  
**Eyebrow:** 404  
**Headline:** This one didn’t make the cut.  
**Body:** The page you’re after was left on the edit floor, or it never existed. The work is still here.  
**Primary CTA:** See the work → `/work`  
**Secondary CTA:** Back to home → `/`  

### Cookie

***New***

> *Verify: Category copy must match the cookies the site actually sets.*

**Message:**  
We use cookies to keep the site working and to understand what people watch here. Choose what you’re comfortable with.

**Accept:** Accept all  
**Essential only:** Essentials only  
**Settings:** Cookie settings  
**Save:** Save choices  
**Policy link:** Cookie policy  
**Categories:**

- **Essential**: Keeps the site running. Always on.
- **Analytics**: Shows us which work gets watched, so we make more of it.
- **Marketing**: Lets us measure our own ads. Off unless you turn it on.

### Open Graph

***New** · app/layout.tsx metadata (openGraph, twitter). Per-page OG lines sit in each page’s meta.*

**Site name:** Light Matter Reality  
**Locale:** en_IN  
**Default title:** Taste can’t be prompted. | Light Matter Reality  
**Default description:**  
An AI-led creative studio in Mumbai, built by people who learnt film, design and brand before AI made it look easy.

**Twitter card:** summary_large_image  
**Default image alt:** The LMR wordmark and the line ‘Taste can’t be prompted.’ set on ivory.  

> *Default image alt: Example only: describe the share image you actually use.*

### Alt text

***New***

> *Note: The live components give posters, card images and the MassField frame empty alt text on purpose, because the link text next to them carries the meaning. These rules are for images that carry meaning on their own.*

**Principles:**

- Describe what a buyer would notice: the material, the light, the setting. Never start with ‘Image of’.
- One sentence, under about 125 characters.
- Name the product category, not the client, unless the client has approved it in writing.
- Mark generated imagery wherever it could pass for the real thing: start with ‘AI-generated visual:’. Anything that shows an unbuilt property starts with ‘Artist’s impression:’.
- Pharma: describe the visual, never the effect. ‘Animation still: a molecule approaching a receptor’, not ‘medicine relieving pain’.
- Behind-the-scenes images: describe the set and the work, never the person. No names, no descriptions of anyone on the crew.
- Texture, grain and background loops are decorative: give them empty alt text.

**Examples:**

- **Jewellery**: Bridal kundan necklace on deep red silk, lit low from the left so the gold reads warm.
- **Fashion**: Close-up of hand zardozi embroidery on an ivory lehenga, threads catching side light.
- **AI-generated jewellery**: AI-generated visual: gold bangles on wet black sand at sunrise.
- **Real estate, unbuilt**: Artist’s impression: sea-facing living room in a residential tower at dusk.
- **Real estate, built**: Sample flat living room with floor-to-ceiling windows over the Thane skyline.
- **Architecture**: Double-height living room with lime-plaster walls and teak joinery at golden hour.
- **Interiors**: Kitchen island in honed green marble with brass fixtures, morning light from the left.
- **Pharma**: Animation still: a molecule approaching a receptor on a cell surface.
- **On set**: Monitor on set showing a gold ring lit against black velvet.

---

## Offer naming: what changed and why

| In the brief | Final name | Why |
|---|---|---|
| Festive Drop | **Festive Edit** | “Edit” works twice: a fashion edit and a film edit. It sounds like a considered collection rather than a content dump, and it suits a heritage jeweller better than the streetwear ring of “drop”. Festive Drop is a fine fallback. |
| Look Expensive Kit | **Project Portrait** | Architects buy craft, not kits. “Portrait” says one finished project gets the patient, well-lit, point-of-view treatment a portrait sitter would. “Look expensive” stays as the offer’s ad hook, where it’s strongest. As a product name it reads as insecure to a design-literate buyer. |
| Launch Story | **Launch Story** (kept) | Plain, searchable, and it puts “story” in the name: the thing developers don’t get from render shops. |
| Molecule Story | **Molecule Story** (kept) | Pairs with Launch Story, sober enough for a pharma buyer, and promises narrative over recitation. |

All four now follow one pattern, context then format, so they read as one family.

## Placeholders to fill

75 distinct placeholders. Pages are listed where each one appears.

**Proof points and facts**

- `[VERIFY: tag for each flagship]`: Home
- `[VERIFY: tag for each card]`: Home
- `[VERIFY: combined years of experience]`: Home, Studio / Manifesto
- `[VERIFY: number of disciplines in the studio]`: Home
- `[VERIFY: combined films, shoots and brands delivered]`: Home

**Contact details, links and the legal name**

- `[VERIFY: studio email]`: Home, Contact / Start a Brief, Global
- `[VERIFY: WhatsApp number]`: Contact / Start a Brief
- `[VERIFY: working hours, for example Monday to Saturday, 10am to 7pm IST]`: Contact / Start a Brief
- `[VERIFY: WhatsApp link]`: Global
- `[VERIFY: keep only if there’s a space to visit]`: Global
- `[VERIFY: Instagram URL]`: Global
- `[VERIFY: LinkedIn URL]`: Global
- `[VERIFY: YouTube URL]`: Global
- `[VERIFY: Behance URL]`: Global
- `[VERIFY: legal entity name]`: Global

**Policies and terms**

- `[VERIFY: travel policy]`: Light, Industry: Architecture & Interiors
- `[VERIFY: standard ownership and usage terms]`: Light
- `[VERIFY: platforms you support]`: Reality
- `[VERIFY: CRMs you support]`: Reality
- `[VERIFY: maintenance terms]`: Reality
- `[VERIFY: weeks]`: Industry: Jewellery & Fashion
- `[VERIFY: current MahaRERA advertising requirements with your legal advisor before publishing]`: Industry: Real Estate
- `[VERIFY: delivery formats]`: Industry: Pharma
- `[VERIFY: other languages]`: Industry: Pharma
- `[VERIFY: pricing approach]`: How We Work
- `[VERIFY: budget bands and minimum engagement]`: Contact / Start a Brief

**Prices**

- `[PRICE]`: Home, Industry: Jewellery & Fashion, Industry: Real Estate, Industry: Architecture & Interiors, Industry: Pharma, Offers

**Scope: quantities, durations, languages**

- `[QTY]`: Industry: Jewellery & Fashion, Industry: Real Estate, Industry: Architecture & Interiors, Industry: Pharma, Offers
- `[LANGUAGE]`: Industry: Jewellery & Fashion, Offers
- `[DURATION]`: Industry: Real Estate, Industry: Architecture & Interiors, Industry: Pharma, Offers
- `[LANGUAGES]`: Industry: Pharma, Offers

**Turnarounds**

- `[TURNAROUND: Festive Edit]`: Home
- `[TURNAROUND: Launch Story]`: Home, Industry: Real Estate
- `[TURNAROUND: Project Portrait]`: Home
- `[TURNAROUND: Molecule Story]`: Home
- `[TURNAROUND: brand film, brief to delivery]`: Light
- `[TURNAROUND: identity project, brief to delivery]`: Matter
- `[TURNAROUND: working days from approved brief]`: Industry: Jewellery & Fashion, Industry: Real Estate, Offers
- `[TURNAROUND: working days from the shoot]`: Industry: Architecture & Interiors, Offers
- `[TURNAROUND: working days from approved script]`: Industry: Pharma, Offers
- `[TURNAROUND: response time]`: Contact / Start a Brief

**Case studies**

- `[CASE STUDY PLACEHOLDER: jewellery & fashion flagship, max 18 characters]`: Home
- `[CASE STUDY PLACEHOLDER: real estate flagship, max 18 characters]`: Home
- `[CASE STUDY PLACEHOLDER: architecture & interiors flagship, max 18 characters]`: Home
- `[CASE STUDY PLACEHOLDER: pharma flagship, max 18 characters]`: Home
- `[CASE STUDY PLACEHOLDER: jewellery & fashion 01, title under 40 characters]`: Home
- `[CASE STUDY PLACEHOLDER: one line on what we made and for whom, under 110 characters]`: Home
- `[CASE STUDY PLACEHOLDER: jewellery & fashion 02, title under 40 characters]`: Home
- `[CASE STUDY PLACEHOLDER: real estate 01, title under 40 characters]`: Home
- `[CASE STUDY PLACEHOLDER: real estate 02, title under 40 characters]`: Home
- `[CASE STUDY PLACEHOLDER: architecture & interiors 01, title under 40 characters]`: Home
- `[CASE STUDY PLACEHOLDER: pharma 01, title under 40 characters]`: Home
- `[CASE STUDY PLACEHOLDER: pharma 02, title under 40 characters]`: Home
- `[CASE STUDY PLACEHOLDER: project title]`: Work
- `[CASE STUDY PLACEHOLDER: industry]`: Work
- `[CASE STUDY PLACEHOLDER: Light / Matter / Reality]`: Work
- `[CASE STUDY PLACEHOLDER: Concept or Client work]`: Work
- `[CASE STUDY PLACEHOLDER: the business problem in two sentences, in the client’s terms]`: Work
- `[CASE STUDY PLACEHOLDER: the idea, and why it fitted this buyer]`: Work
- `[CASE STUDY PLACEHOLDER: what we made, for example one brand film, 24 stills and a landing page]`: Work
- `[CASE STUDY PLACEHOLDER: verified results only, with the source and the time period]`: Work
- `[CASE STUDY PLACEHOLDER: disciplines, for example direction, cinematography, edit, design]`: Work
- `[CASE STUDY PLACEHOLDER: jewellery & fashion flagship]`: Work
- `[CASE STUDY PLACEHOLDER: real estate flagship]`: Work
- `[CASE STUDY PLACEHOLDER: architecture & interiors flagship]`: Work
- `[CASE STUDY PLACEHOLDER: pharma flagship]`: Work
- `[CASE STUDY PLACEHOLDER: jewellery & fashion 01]`: Work
- `[CASE STUDY PLACEHOLDER: jewellery & fashion 02]`: Work
- `[CASE STUDY PLACEHOLDER: real estate 01]`: Work
- `[CASE STUDY PLACEHOLDER: real estate 02]`: Work
- `[CASE STUDY PLACEHOLDER: architecture & interiors 01]`: Work
- `[CASE STUDY PLACEHOLDER: pharma 01]`: Work
- `[CASE STUDY PLACEHOLDER: pharma 02]`: Work

**Template tokens (filled per item)**

- `[YEAR]`: Work, Global
- `[N]`: Journal, Global

## Promises the copy makes for you

These lines commit the studio to a practice. They're all reasonable, but confirm each one is true before launch.

- “NDA before the brief, as standard.” (Pharma, Contact)
- “You’ll always know where AI was used.” and “We tell you where AI was used in anything we deliver.” (How We Work)
- “Every brief is read by the studio. Not a bot.” and “We’ll message before we call.” (Contact)
- “Nothing goes live until your legal team has signed off.” and MahaRERA details on every asset that needs them (Real Estate)
- “We work only from the claims, references and prescribing information your team approves.” (Pharma)
- “We don’t add what isn’t there.” and “Never invented furniture in a real space.” (Architecture & Interiors)
- “If it looks fake to us, it never reaches you.” (Light)
- “We design for a mid-range phone on mobile data first.” (Reality)
- “Exclusive of GST.” on every price, and the cookie categories matching the cookies the site actually sets.

## Final output check

Checked by script against `content/copy.json` as written.

| Check | Result |
|---|---|
| No individual, client or employer named | **Pass.** No first-person singular anywhere (0 found). “Founder” appears 2 times, both as negations (“No founder story”, “no founder myth”). The only proper nouns are platforms (Instagram, WhatsApp, YouTube, LinkedIn, Behance, Google), the regulator (MahaRERA), places, festivals, languages and LMR’s own service and offer names. |
| No invented numbers, testimonials or logos | **Pass.** Proof points, prices, quantities, turnarounds and results are placeholders. The digits that remain are formats (2D, 3D, 2BHK), terms from the brief (about 90 days; twenty images and five festive ads as scope examples), contact-form options (budget bands, timelines) and the +91 phone prefix. The pain lines are unattributed inner voice, not testimonials. |
| Every page has a meta title and description | **Pass.** 15 of 15, all within limits (table below). Case studies and articles get meta templates. |
| No banned words | **Pass.** 0 matches for the banned list, including variants such as elevated, seamlessly and revolutionary. 0 emoji. |
| House style | **Pass.** 0 em dashes. No US spellings (color, jewelry, organize, center, catalog, inquiry and the rest were checked). |
| Placeholders | **75** distinct, listed above. |

| Page | Title chars (60 max) | Description chars (155 max) |
|---|---|---|
| Home | 51 | 145 |
| Studio / Manifesto | 52 | 142 |
| Light | 56 | 130 |
| Matter | 58 | 148 |
| Reality | 59 | 146 |
| Industry: Jewellery & Fashion | 58 | 143 |
| Industry: Real Estate | 58 | 147 |
| Industry: Architecture & Interiors | 55 | 144 |
| Industry: Pharma | 53 | 146 |
| How We Work | 47 | 147 |
| Offers | 54 | 149 |
| Work | 54 | 146 |
| Journal | 48 | 145 |
| Contact / Start a Brief | 52 | 140 |
| 404 | 37 | 60 |

## Keyword map

| Page | Primary keyword | Secondary keywords |
|---|---|---|
| Home | AI creative studio Mumbai | AI ad films, AI product photography, brand film production Mumbai, creative agency Mumbai |
| Studio / Manifesto | creative studio Mumbai | AI creative agency Mumbai, brand storytelling studio, faceless creative studio |
| Light | brand film production Mumbai | ad film production Mumbai, AI ad films, AI video production India, product photography Mumbai, AI product photography |
| Matter | brand identity design Mumbai | brand strategy agency Mumbai, packaging design Mumbai, social media design agency, carousel design |
| Reality | website design Mumbai | 3D website design, scroll animation website, landing page design Mumbai, CRM automation, virtual walkthrough |
| Industry: Jewellery & Fashion | jewellery shoot Mumbai | jewellery brand film, jewellery photography Mumbai, AI jewellery photography, festive jewellery campaign, fashion film Mumbai, AI lookbook |
| Industry: Real Estate | real estate video production Mumbai | real estate video production Thane, real estate marketing agency Navi Mumbai, pre-launch campaign real estate Mumbai, real estate walkthrough video, AI visuals for real estate, project launch film |
| Industry: Architecture & Interiors | interior design photography Mumbai | architectural photography Mumbai, architecture film, interior designer portfolio website, interior walkthrough video, architecture photography Thane |
| Industry: Pharma | pharma explainer video India | MOA animation, medical animation India, pharma training videos, pharma marketing agency Mumbai, pharma website design |
| How We Work | creative agency process | content retainer agency Mumbai, creative retainer Mumbai, AI content production process |
| Offers | creative production packages Mumbai | festive jewellery campaign, real estate launch campaign, architecture photography package, pharma explainer video series |
| Work | creative studio portfolio Mumbai | brand film portfolio, jewellery campaign case study, real estate launch case study, AI ad film examples |
| Journal | brand storytelling insights | jewellery photography tips, real estate marketing Mumbai, pharma explainer video, AI in advertising India |
| Contact / Start a Brief | creative agency Mumbai contact | hire a creative studio Mumbai, brand film quote Mumbai, real estate marketing agency Mumbai |

Article-level keywords sit with each Journal title. Keep keywords in headings and the first paragraph, once each. The copy is written to read naturally first.
