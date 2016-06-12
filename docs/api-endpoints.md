# API Endpoints

## HTML API

### Root

- `GET /` - loads React web app

### Users

- `GET /users/new`
- `POST /users`
- `PATCH /users`

### Session

- `GET /session/new`
- `POST /session`
- `DELETE /session`

## JSON API

### Pets

- `GET /api/pets`
  - Pets index/search
- `POST /api/pets`
- `GET /api/pets/:id`
- `PATCH /api/pets/:id`
- `DELETE /api/pets/:id`

### Favorites

- `GET /api/favorites`
- `POST /api/favorites`
- `DELETE /api/favorites/:id`

### Tags

- A pets's tags will be included in the pet show template
- `GET /api/tags`
  - includes query param for typeahead suggestions
- `POST /api/pets/:pet_id/tags`: add tag to pet by name
- `DELETE /api/pets/:pet_id/tags/:tag_name`: remove tag from pet by
  name
