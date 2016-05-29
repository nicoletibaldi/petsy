# Petsy

[Heroku link][heroku]

[heroku]: http://www.herokuapp.com

## Minimum Viable Product

Petsy is a web application inspired by Etsy that will be built using Ruby on Rails and React.js.  By the end of Week 9, this app will, at a minimum, satisfy the following criteria:

- [ ] New account creation, login, and guest/demo login
- [ ] Smooth, bug-free navigation
- [ ] Adequate seed data to demonstrate the site's features (using Petfinder API)
- [ ] The minimally necessary features for an Etsy-inspired site: ability to create a listing, view listings by category, and select a pet to add to favorites (equivalent to "cart" on the traditional Etsy site, "checkout" will be contacting the rescue organization)
- [ ] Hosting on Heroku
- [ ] CSS styling that is satisfactorily visually appealing
- [ ] A production README, replacing this README

## Product Goals and Priorities

Petsy will allow users to do the following:

<!-- This is a Markdown checklist. Use it to keep track of your
progress. Put an x between the brackets for a checkmark: [x] -->

- [ ] Create an account (MVP)
- [ ] Log in / Log out, including as a Guest/Demo User (MVP)
- [ ] Create, read, edit, and delete listings (MVP)
- [ ] View listings by category, each with separate index page (MVP)
- [ ] Add a pet to favorites list (equivalent to add to cart) (MVP)
- [ ] Tag listings with multiple tags (expected feature, but not MVP)
- [ ] Register using Google or Facebook (expected, but not MVP)
- [ ] Users can leave reviews (if I have time)

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

- [ ] create new project
- [ ] create `User` model
- [ ] authentication
- [ ] user signup/signin pages
- [ ] blank landing page after signin

### Phase 2: Pet Listing Model, API, and basic APIUtil (1.5 days)

**Objective:** Pet listings can be created, read, edited and destroyed through the API.

- [ ] create `Pet` model
- [ ] seed the database with a small amount of test data
  - [ ] set up Petfinder API
- [ ] CRUD API for pets (`PetsController`)
- [ ] jBuilder views for pets
- [ ] setup Webpack & Flux scaffold
- [ ] setup `APIUtil` to interact with the API
- [ ] test out API interaction in the console.

### Phase 3: Flux Architecture and Router (1.5 days)

**Objective:** Pet listings can be created, read, edited and destroyed with the user interface.

- [ ] setup the flux loop with skeleton files
- [ ] setup React Router
- implement pets component, building out the flux loop as needed.
  - [ ] `PetsIndex`
  - [ ] `PetIndexItem`
  - [ ] `PetForm`

### Phase 4: Start Styling (1 day)

**Objective:** Existing pages (including signup/signin) will look good.

- [ ] create a basic style guide
- [ ] position elements on the page
- [ ] add basic colors & styles

### Phase 5: PetTypes/Browsing (1 day)

**Objective:** Pets belong to PetTypes, and can be viewed by PetType.

- [ ] create `PetType` model
- build out API, Flux loop, and components for:
  - [ ] adding pets requires a pet type
  - [ ] viewing pets by pet type
- Use CSS to style new views

(Adds organization to the listings. Pet listings belong to a pet type,
which has its own `Index` view.)

### Phase 6: Tags (1 day)

**Objective:** Pets are searchable (using tags (ie: breed, age, sex))

- [ ] create `Tag` model and join table
- build out API, Flux loop, and components for:
- [ ] fetching tags for pet listing
- [ ] adding tags to pet listing
- [ ] searching pet listings by tag
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
- [ ] Search through listings for non-tag information
- [ ] Google/Facebook authentication
- [ ] User reviews/comments
- [ ] Show 'similar pets' in bottom right corner of show page

[phase-onetwo]: ./docs/phases/phase1-2.md
[phase-threefour]: ./docs/phases/phase3-4.md
[phase-fivesix]: ./docs/phases/phase5-6.md
[phase-seveneight]: ./docs/phases/phase7-8.md
