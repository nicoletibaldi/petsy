# Petsy

[Petsy on Heroku!][Petsy]

[Petsy]: http://petsypets.herokuapp.com

## Minimum Viable Product

Petsy is a web application inspired by Etsy that will be built using Ruby on Rails and React.js.  By the end of Week 9, this app will, at a minimum, satisfy the following criteria:

- [x] New account creation, login, and guest/demo login
- [ ] Smooth, bug-free navigation
- [ ] Adequate seed data to demonstrate the site's features (using Petfinder API)
- [ ] The minimally necessary features for an Etsy-inspired site: view listings by category, view detailed pet page, and select a pet to add to favorites (equivalent to "cart" on the traditional Etsy site, "checkout" will be contacting the rescue organization)
- [ ] Hosting on Heroku
- [ ] CSS styling that is satisfactorily visually appealing
- [ ] A production README, replacing this README

## Product Goals and Priorities

Petsy will allow users to do the following:

<!-- This is a Markdown checklist. Use it to keep track of your
progress. Put an x between the brackets for a checkmark: [x] -->

- [x] Create an account (MVP)
- [x] Log in / Log out, including as a Guest/Demo User (MVP)
- [x] View listings by category, each with separate index page (MVP)
- [ ] Add a pet to favorites list (equivalent to add to cart) (MVP)
- [ ] Tag listings with multiple tags (expected feature, but not MVP)
- [ ] Register using Google or Facebook (expected, but not MVP)
- [ ] Users can leave reviews (if I have time)
- [ ] Create, read, edit, and delete listings (if I have time - how to integrate with Petfinder dogs?)

## Design Docs
* [View Wireframes][views]
* [React Components][components]
* [Flux Cycles][flux-cycles]
* [API endpoints][api-endpoints]
* [DB schema][schema]

[views]: ./docs/wireframes
[components]: ./docs/components.md
[flux-cycles]: ./docs/flux-cycles.md
[api-endpoints]: ./docs/api-endpoints.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: Backend setup and User Authentication (0.5 days)

**Objective:** Functioning rails project with Authentication

- [x] create new project
- [x] create `User` model
- [x] authentication
- [x] user signup/signin pages
- [x] blank landing page after signin

### Phase 2: Pet Listing Model, API, and basic APIUtil (1.5 days)

**Objective:** Pet listings can be created, read, edited and destroyed through the API.

- [x] seed the database with a small amount of test data
  - [x] set up Petfinder API
- [x] setup Webpack & Flux scaffold
- [x] setup `APIUtil` to interact with the API
- [x] test out API interaction in the console.

### Phase 3: Flux Architecture and Router (1.5 days)

**Objective:** Pet listings can be read with the user interface.

- [x] setup the flux loop with skeleton files
- [x] setup React Router
- implement pets component, building out the flux loop as needed.
  - [x] `PetsIndex`
  - [x] `PetIndexItem`
  - [x] `PetDetail`

### Phase 4: Start Styling (1 day)

**Objective:** Existing pages (including signup/signin) will look good.

- [x] create a basic style guide
- [x] position elements on the page
- [x] add basic colors & styles

### Phase 5: PetTypes/Browsing (1 day)

**Objective:** Pets belong to PetTypes, and can be viewed by PetType.

- [ ] create `PetType` model
- build out API, Flux loop, and components for:
  - [ ] viewing pets by pet type
- [ ] Use CSS to style new views

(Adds organization to the listings. Pet listings belong to a pet type,
which has its own `Index` view.)

### Phase 6: Search (1 day)

**Objective:** Pets are searchable

- build out API, Flux loop, and components for:
- [ ] fetching pets by search
- [ ] Style new elements

### Phase 7: Favorites (1 day)

**Objective:** Users can add pets to favorites

- [ ] create `Favorites` model
- build out API, Flux loop, and components for:
  - [ ] adding pets to favorites
  - [ ] viewing all favorites
  - [ ] contacting the rescue ('checking out - open mail client?')
  - [ ] removing pets from favorites
- Use CSS to style new views


### Phase 8: Styling Cleanup and Seeding (1 day)

**Objective:** Make the site feel more cohesive and awesome.

- [ ] Get feedback on my UI from others
- [ ] Refactor HTML classes & CSS rules
- [ ] Add modals, transitions, and other styling flourishes.
- [ ] Try to match UI more closely to Etsy

### Bonus Features (TBD)
- [ ] Google/Facebook authentication
- [ ] Users can create and edit their profile pages
- [ ] User reviews/comments
- [ ] Show 'similar pets' in bottom right corner of show page

[phase-onetwo]: ./docs/phases/phase1-2.md
[phase-threefour]: ./docs/phases/phase3-4.md
[phase-fivesix]: ./docs/phases/phase5-6.md
[phase-seveneight]: ./docs/phases/phase7-8.md
