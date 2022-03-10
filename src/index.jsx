import React from 'react';
import * as ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import { compose, createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga'
import { Provider } from 'react-redux'
import { createLogger } from 'redux-logger'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import './index.css';
import rootReducer from './reducers/rootReducer'
import rootSaga from './sagas/rootSaga'
import reportWebVitals from './reportWebVitals';
import App from './App';

const sagaMiddleware = createSagaMiddleware();
const logger = createLogger({ diff: true, collapsed: true, });
const store = createStore(
  rootReducer,
  //compose(applyMiddleware(sagaMiddleware)),
  compose(applyMiddleware(sagaMiddleware, logger)),
);
sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <DndProvider backend={HTML5Backend}>
          <App />
        </DndProvider>
      </HashRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
// ↑ アプリのパフォーマンスを測定したいときは、
// ↑ 「reportWebVitals()」の括弧の中に表示用関数を書いてください。
// ↑ たとえば「reportWebVitals(console.log)」と記述すると、
// ↑ ログに測定結果を表示できます。
// ↑ 詳しくは https://bit.ly/CRA-vitals を参照してください。