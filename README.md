# 360carpool-api
The backend for our geekspeak hack4good hackathon app, a sort of Uber-Tinder for workplace carpooling

### Config
- Make sure <a href='https://www.mysql.com/downloads/'>MySQL</a> is installed on your machine. This is needed to run the local server.
- In the root of the project, run `npm run db`. You should get the following output:
```
Connected!
Database created
successfuly created users table
successfuly add index to users table
successfuly created cars table
successfuly created drives table
successfuly add index to users table
successfuly created companies table
insert successful
insert successful
insert successful
insert successful
Carpool-Rest-API listening at http://[::]:3000
API requests are ready to be accepted!
```
Some test data is added to the database during this process.
- The server listens on port `3000`. This can be changed in `db-config/vars.js`, along with other config options such as the `host`. The default `host` is `localhost`.

---

### Example endpoints/responses:

`localhost:3000/joinRide/?rider_id=2&which_way=work&driver_id=1`
```
{
    "status": "success",
    "message": "User can ride with this driver"
}
```

`localhost:3000/searchRides/?rider_id=1&which_way=home`
```
{
    "message": [
        {
            "driver_id": 2,
            "startingFrom": "300 Green Street, Whitby, Ontario, Canada L1N4Z4",
            "waypoints": "Zephyr, Ontario|Union Station, Toronto, Ontario",
            "destination": "Union Station, Toronto, Ontario",
            "myAddedDist": 0
        }
    ]
}
```

`localhost:3000/distanceToAndFrom?origin=1269 Concession 3 Uxbridge Ontario&dest=Union Station Toronto&waypoints[]=markville mall markham&waypoints[]=carp, ontario&waypoints=tap and tankard whitby`
```
{
    "result": 756989
}
```

`localhost:3000/updateKarma?id=1&value=20`
```
{
    "message": "user 1 karma updated"
}
```
