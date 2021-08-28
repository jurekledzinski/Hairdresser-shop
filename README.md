# ![WebApp](https://github.com/jurekledzinski/Hairdresser-shop/blob/media/images/Course%20shop.jpg?raw=true)

# ![WebApp](https://github.com/jurekledzinski/Hairdresser-shop/blob/media/images/Admin%20panel%20hairdresser.jpg?raw=true)

# Hairdresser shop

Landing page of hairdresser shop with hidden admin panel, booking system, payment in stripe.

### Features

- Slider with services prices.
- Slider with testimonials.
- Possibility to add own opinion.
- Send email to shop.
- Smooth scroll to sections.
- Change highlight of menu options when scroll.
- Slider gallery with modal.
- Hidden admin panel, register and logging page.
- Control permissions in admin panel.
- Charts in admin panel.
- Booking system.
- Protected links, api.
- Page not found.
- Payment with stripe.
- Responsive web application.
- Email booking confirmation with cancel code.
- Email cancel confirmation.
- Save images in firebase storage.
- Animated loader.
- Lazy loading
- Check and remove booking, canceled orders, emails, opinions.
- Make appointments, change time of open shop, images in gallery, services.
- Update profile admins

### Technologies

Build with:

- [ReactJS](https://reactjs.org/) - A JavaScript library for building user interfaces.
- [React router](https://reactrouter.com/) - Collection of navigational components.
- [Redux](https://redux.js.org/) - A Predictable State Container for JS Apps.
- [React table](https://react-table.tanstack.com/) - Lightweight and extensible
  data tables for React.
- [ReactDatePicker](https://reactdatepicker.com/) - A simple and reusable datepicker component for React.
- [NodeJS](https://nodejs.org/en/) - JavaScript runtime built on Chrome's V8 JavaScript engine.
- [ExpressJS](https://expressjs.com/) - Fast, unopinionated, minimalist web framework for Node.js.
- [Mongoose](https://mongoosejs.com/) - Elegant MongoDB object modeling for Node.js.
- [Firebase](https://firebase.google.com/) - Platform developed by Google for creating mobile and web applications.
- [PassportJS](http://www.passportjs.org/) - Simple, unobtrusive authentication for Node.js.
- [ChartJS](https://www.chartjs.org/) - Simple yet flexible JavaScript charting for designers & developers.
- [Scss](https://sass-lang.com/) - CSS extension language.
- [Webpack](https://webpack.js.org/) - bundle assets, style, scripts, images ...
- [Redux-thunk](https://www.npmjs.com/package/redux-thunk) - Thunk middleware for Redux.
- [Formik](https://formik.org/) - Library to help build and validate forms.
- [Date-fns](https://date-fns.org/) - Library, toolset for manipulating JavaScript dates.
- [Stripe](https://stripe.com/en-nl) - Payment infrastructure for the internet.
- [Nodemailer](https://nodemailer.com/about/) - is a module for Node.js applications to allow email sending.

### Installation

Application requires [Express](https://expressjs.com/) v4+ and [Webpack](https://webpack.js.org/) v5 to run.

Backend installation

```sh
clone respository or download files
create .env file in root folder
add in .env file:
ATLAS_URL= xxxx mongo atlas url xxxx
NODE_ENV=development
SESS_NAME=xxxx session name xxxx
SESS_SECRET=xxxx session secret xxxx
ROLE_ADMIN=Admin
ROLE_SUPER_ADMIN=Super Admin
HOST_EMAIL=xxxx smtp host email xxxx
PORT_PROVIDER_EMAIL=xxxx port provider email xxxx
EMAIL_USER= xxxx shop email, from where is send confirmation xxxx
PASSWORD_USER= xxxx password generated by your email provider xxxx
EMAIL_SENDTO=xxxx where should come email from clients xxxx
STRIPE_PUBLISHABLE_KEY= xxxx stripe publishable key pk_test... xxxx
STRIPE_SECRET_KEY=xxxx stripe secret key sk_test_... xxxx
npm install in root folder
```

Client installation

```sh
cd ./client
npm install in client folder
```

- In app.js file in root folder, in cors origin change to http://localhost:3000
- In package.json file in client folder, remove proxy.
- In client/src/helpers/request.js in axios.create --- add line: baseURL: "http://localhost:5000"
- In folder routes/checkout.js change this in development mode:
  success_url: `http://localhost:3000/booking/success/${bookingId}`,
  cancel_url: `http://localhost:3000/booking/cancel/${bookingId}`,
- The can appear some errors due to cookie sameSite or content security blocking after changes in browsers, so it is good to test with https protocol on localhost.
- Google map is only for development purpose here so can appear message popup.

To test in stripe, use number card: 4242 4242 4242 4242

### Run application

Run backend server

```sh
npm run start_local - run locally
```

Run client server

```sh
cd ./client
npm start - run locally
```

#### See live

[Hairdresser shop](https://safe-crag-32363.herokuapp.com/)

## License

MIT © [Jurek Ledziński](https://github.com/jurekledzinski)
