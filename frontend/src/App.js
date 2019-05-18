import React from 'react'
import LinkList from './components/LinkList'
import CreateLink from './components/CreateLink'
import Header from './components/Header'
import { Switch, Route } from 'react-router-dom'

function App() {
  return (
    <div className="center w85">
      <Header />
      <div className="ph3 pv1 background-gray">
        <Switch>
          <Route exact path="/" component={LinkList} />
          <Route exact path="/create" component={CreateLink} />
        </Switch>
      </div>
    </div>
  )
}

export default App
