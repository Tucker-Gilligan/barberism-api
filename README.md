# Barberism API!

## Summary

This is the backend code for Baberism, an application which allows people with autism or sensory sensitivities to connect with barbers who are capable and willing to meet their individualized needs. Users of the application can request a list of barbers, request a barber by state, request a single barber, delete a barber, or update a barber's information.

## API Documentation

### Barbers Endpoints

### `GET /api/barbers`

Returns an array of all barbers who offer services. This call does not filter the results

### `GET /api/barbers/:barber_id`

Returns a single barber, represented in a JSON object.

### `GET /api/barbers/?state={state}`

**Sample Query**

`/api/barbers/?state=pennsylvania `

Returns an array of all barbers located within the queried state, including a list of their services.

**Example response**

```JSON
[
    {

        "barber_id": 3,
        "barber_name": "Bob Barber",
        "barber_location": "Pennsylvania",
        "services": "Home Haircuts,Scissor Cuts,Sensory Hours",
        "phone_number": "(000) 000-0000",
        "email": "barberbob@gmail.com"
    }
]
```

- `barber_id` `- string` - uuid of a barber
- ` barber_name` `-string ` - Name of the barber providing the service
- ` barber_location` `-string ` - Location (state) of the barber providing the service
- ` services` `-array ` - Array of services provided
- ` phone_number` `-string ` - Phone number of the barber providing the service
- ` email` `-string ` - Email of the barber providing the service

### `POST /api/barbers`

A barber is created via a POST request, which includes bareber_id, barber_name, barber_location, phone_number, and email

**Example request**

```Javascript
{
    body: {
    "barber_name": "Edward Scissorhands",
      "barber_location": "Florida",
      "services": [1, 2, 3], //services are referenced by ID
      "phone_number":"(000) 000-0000",
      "email": "eddyscizz@gmail.com",
      },
}
```

### `PATCH /api/barbers/:barber_id`

This endpoint allows users to update a barber's information

### `DELETE /api/barbers/:barber_id`

This endpoint allows users to delete barbers, which removes them from the list of barbers

## Technology used

### Backend

- Express for handling API requests
- NodeJS for interacting with the file system
- Postgrator for database migration
- Mocha, Chai, Supertest for endpoints testing
- Knex.js for interfacing with **PostgreSQL** database
- Heroku for database and server deployment

### Client:

- ReactJS
- react-router-dom for routing and in-app navigation
- CSS (vanilla CSS)
- Babel
- Webpack
- Vercel for deployment
- Jest for testing
