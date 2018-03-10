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

`http://localhost:3000/drives/carpooling/joinRide/1/2/home`
> {"status":"success","message":"User can ride with this driver"}

`http://localhost:3000/drives/carpooling/searchRides/1/work`
> {"message":[{"driver_id":1,"startingFrom":"Union Station, Toronto, Ontario","waypoints":"Eaton Center, Toronto, Ontario|Union Station, Toronto, Ontario","destination":"300 Green Street, Whitby, Ontario, Canada L1N4Z4","myAddedDist":0}]}

`http://localhost:3000/users/1`
> {"result":[{"id":1,"name":"Dude","company":1,"is_driver":1,"out_of_way":2000,"driver_id":1,"karma":-1,"address":"Union Station, Toronto, Ontario","leave_home":"08:00:00","arrive_home":"18:00:00","leave_work":"17:00:00","arrive_work":"09:00:00"}]}

`http://localhost:3000/users/updateKarma/1/5`
> {"message":"user 1 karma updated"}

`http://localhost:3000/cars/`
> {"result":[{"id":1,"driver_id":1,"manufacturer":"Ferrari","model":"2007 Enzo","gas_mileage":8,"available_seats":1}]}

