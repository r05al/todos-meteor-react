App = React.createClass({

  mixins: [ReactMeteorData],

  getInitialState() {
    return {
      hideCompleted: false
    }
  },

  getMeteorData() {
    let query = {};

    if(this.state.hideCompleted) {
      query = {checked: {$ne: true}};
    }

    return {
      tasks: Tasks.find(query, {sort: {createdAt: -1}}).fetch(),
      incompleteCount: Tasks.find({checked: {$ne: true}}).count(),
      currentUser: Meteor.user()
    };
  },

  // getTasks() {
  //   return [
  //     { _id: 1, text: "This is task 1" },
  //     { _id: 2, text: "This is task 2" },
  //     { _id: 3, text: "This is task 3" }
  //   ];
  // },

  renderTasks() {
    return this.data.tasks.map((task) => {
      const currentUserId = this.data.currentUser && this.data.currentUser._id;
      const showPrivateButton = task.owner === currentUserId;

      return <Task
      key={task._id}
      task={task}
      showPrivateButton={showPrivateButton} />;
    });
  },

  handleSubmit(event) {
    event.preventDefault();

    var text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

    Meteor.call("addTask", text); // add security
    // Tasks.insert({
    //   text: text,
    //   createdAt: new Date(), //current time
    //   owner: Meteor.userId(), // _id of logged in user
    //   username: Meteor.user().username //username of logged in user
    // });

    // clears form
    ReactDOM.findDOMNode(this.refs.textInput).value="";
  },

  toggleHideCompleted(){
    this.setState({
      hideCompleted: ! this.state.hideCompleted
    });
  },

  render() {
    return (
      <div className="container">
        <header>
          <h1>Todo List ({this.data.incompleteCount})</h1>

          <label className="hide-completed">
            <input
              type="checkbox"
              readOnly={true}
              checked={this.state.hideCompleted}
              onClick={this.toggleHideCompleted} />
              Hide Completed Tasks
          </label>

          <AccountsUIWrapper />

          { this.data.currentUser ?
            <form className="new-task" onSubmit={this.handleSubmit} >
              <input
                type="text"
                ref="textInput"
                placeholder="Type to add new tasks" />
            </form> : ''
          }
        </header>

        <ul>
          {this.renderTasks()}
        </ul>
      </div>
    );
  }
});
