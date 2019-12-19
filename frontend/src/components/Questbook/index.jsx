import React from 'react';
import { NavLink, BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Container, Menu, Popup, Icon } from 'semantic-ui-react';
import AllTasks from './defaultTasks';
import CompletedTasks from './completedTasks';
import UncompletedTasks from './uncompletedTasks';
import FailedTasks from './failedTasks';
import MenuQuestbook from './menuQuestbook';
import AddTask from './addTask';


const QuestbookContent = () => {


  return (
    <BrowserRouter>
    <Container text>
      <MenuQuestbook />
      <Switch>
          <Route exact path="/questbook" component={AllTasks} />
          <Route exact path="/questbook/completed" component={CompletedTasks} />
          <Route exact path="/questbook/uncompleted" component={UncompletedTasks} />
          <Route exact path="/questbook/failed" component={FailedTasks} />
          <Route exact path="/questbook/addtask" component={AddTask} />
        </Switch>
  </Container>
  </BrowserRouter>
  );
};

export default QuestbookContent;
