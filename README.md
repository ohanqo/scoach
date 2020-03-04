<h1 align="center"><img width="50" height="50" src="front/public/assets/images/logo.svg" /> Scoach</h1>

<br />

<p align="center">
    Web app for coachs and customers. Track your weight evolution and get courses. 
    <br />  
    Build with NestJS, React and Tailwind.
</p>

<br />

## Prerequisite

- Node (>= 10.15.2)
- Yarn
- MySQL (5.7)

## Installation

```
$ git clone https://github.com/ohanqo/scoach
```

Create a database named `scoach`

Load data in the database from the sql dump

Install api dependencies

```
$ cd api && yarn
```

Start the api

```
$ yarn start:dev
```

Install front dependencies

```
$ cd front && yarn
```

Start the front

```
$ yarn start
```

You can connect as customer using following credentials:
<br/>
email: _customer@gmail.com_, password: _password_

You can connect as coach using following credentials:
<br/>
email: _coach@gmail.com_, password: _password_
