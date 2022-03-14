# Help Call

## Introduction

Han Solo has recently been appointed General of the Rebel Alliance and seeks to strike a major blow against the Galactic Empire to rekindle the flame of resistance. The rebel intelligence service has detected a call for help from an Imperial cargo ship adrift in an asteroid field. The ship's manifest is ultra-classified, but is rumored to carry rations and weaponry for an entire legion.

![1](https://imgur.com/Ys4ishy.png)

This NodeJS API returns the source and content of the distress message. For this, you have three satellites that will allow you to triangulate the position but be careful! the message may not reach each satellite in full due to the asteroid field in front of the spacecraft.

## Quickstart

The API is running on a GAE of Google. To test use the following URL: 

[https://challenge-343502.rj.r.appspot.com](https://challenge-343502.rj.r.appspot.com)

### Prerequisites

- Node 16.

### Developer setup

1. Clone the project.
2. Run: npm i
3. Create .env file.
4. Run: npm run dev

### API

#### POST /topsecret

Service to obtain the position and the message of the ship.

BODY:
```json
{
    "satellites": [
        {
            "name": "kenobi",
            "distance": 761.57,
            "message": ["this", "", "", "message", ""]
        }, {
            "name": "skywalker",
            "distance": 412.31,
            "message": ["", "is", "", "", "secret"]
        }, {
            "name": "sato",
            "distance": 670.82,
            "message": ["this", "", "a", "", ""]
        }
    ]
}
```
#### POST /topsecret_split

Service with which you enter the information of a satellite (distance and message of the ship). When all 3 satellites (kenobi, skywalker and sato) are entered, the position and message of the ship are obtained.

BODY:
```json
{
    "distance": 761.57,
    "message": ["this", "", "", "message", ""]
}
```
#### GET /topsecret_split/{ship_name}?distance={distance}&message={message}

Service with which you enter the information of a satellite (distance and message of the ship). When all 3 satellites (kenobi, skywalker and sato) are entered, the position and message of the ship are obtained.

## Documentation

The mathematical method of trilateration was used to obtain the position of the ship. This method is used to determine the location of a point using the geometry of spheres, circles or triangles (for this case we use triangles). For the calculation, is used the distances between the different points.

![2](https://imgur.com/OlDa0uP.png)

Difference of quadratic distances to the ship (Satellite 1 minus Satellite 2):

![3](https://imgur.com/burd27Q.png)

Solving Yn:

![4](https://imgur.com/eYwcTuP.png)

Then the relationship between Yn and Xn:

![5](https://imgur.com/AqOfHH7.png)

Now considering that the Quadratic Distance to the ship of Satellite 3 is:

![6](https://imgur.com/QICw1r6.png)

If Yn is replaced in this distance, we have:

![7](https://imgur.com/XsUSqVt.png)

Calculating values of the equation:

![8](https://imgur.com/0jHIqZE.png)

Giving it the form of a second degree equation, it becomes:

![9](https://imgur.com/chEZZQv.png)

This equation, when delivering 2 values Xn1 and Xn2, has the following interpretations:

- If the 2 values of Xn are two real numbers, then two values for Yn are calculated with equation i), choosing as the correct result the pair of values (Xn,Yn) that satisfies the distance equation 3 (D3 : sato).
- If the 2 values of Xn are two complex numbers, then the problem has no solution since some or all of the distances from the satellites to the ship are not correct (Error 404).

## TO DO

- Create test cases.
- Add cases not covered in error control.
- Improve the grammar of the message translation.