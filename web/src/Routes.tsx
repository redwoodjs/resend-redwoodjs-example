// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Set, Router, Route } from '@redwoodjs/router'

import ScaffoldLayout from 'src/layouts/ScaffoldLayout'

const Routes = () => {
  return (
    <Router>
      <Set wrap={ScaffoldLayout} title="Emails" titleTo="emails" buttonLabel="New Email" buttonTo="newEmail">
        <Route path="/emails/new" page={EmailNewEmailPage} name="newEmail" />
        <Route path="/emails/{id}/edit" page={EmailEditEmailPage} name="editEmail" />
        <Route path="/emails/{id}" page={EmailEmailPage} name="email" />
        <Route path="/" page={EmailEmailsPage} name="emails" />
      </Set>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
