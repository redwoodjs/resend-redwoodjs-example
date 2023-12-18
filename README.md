# Resend with RedwoodJS

This example shows how to use Resend with [RedwoodJS](https://redwoodjs.com).

## Prerequisites

To get the most out of this guide, you’ll need to:

* [Create an API key](https://resend.com/api-keys)
* [Verify your domain](https://resend.com/domains)

## Instructions

1. Define environment variables in `.env` file.

  ```sh title=.env
RESEND_API_KEY=<your-key>
  ```

2. Install dependencies:

  ```sh
yarn
  ```

3. Execute the following command:

  ```sh
yarn redwood dev
  ```

4. Open URL in the browser:

  ```sh
curl http://localhost:8911/send
  ```

## License

MIT License


----

* yarn rw setup mailer
* yarn workspace api add @redwoodjs/mailer-handler-resend
