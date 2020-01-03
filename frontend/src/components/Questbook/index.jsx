import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import AllTasks from './defaultTasks';
import MenuQuestbook from './menuQuestbook';
import AddTask from './addTask';
import Tasks from '../../views/Tasks';

const QuestbookContent = () => {
  return (
    <BrowserRouter>
    <Container text>
      <MenuQuestbook />
      <Switch>
          <Route exact path="/questbook" render={(props) => <AllTasks {...props} type={'all'} />} />
          <Route exact path="/questbook/completed" render={(props) => <AllTasks {...props} type={'completed'} />}/>
          <Route exact path="/questbook/uncompleted" render={(props) => <AllTasks {...props} type={'uncompleted'} />} />
          <Route exact path="/questbook/failed" render={(props) => <AllTasks {...props} type={'failed'} />}/>
          <Route exact path="/questbook/addtask" component={AddTask} />
          <Route exact path="/tasks" component={Tasks} />
          <Route exact path="/questbook/addCustomTask" render={() => <Redirect to="/tasks" />} />
        </Switch>
  </Container>
  </BrowserRouter>
  );
};

export default QuestbookContent;
