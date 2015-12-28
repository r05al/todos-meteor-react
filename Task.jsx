Task = React.createClass({
  propTypes: {
    task: React.PropTypes.object.isRequired,
    showPrivateButton: React.PropTypes.bool.isRequired
  },

  toggleChecked() {
    // set the checked property to opposite of current value
    Meteor.call("setChecked", this.props.task._id, ! this.props.task.checked); // add security
    // Tasks.update(this.props.task._id, {
    //   $set: {checked: ! this.props.task.checked}
    // });
  },

  deleteThisTask() {
    Meteor.call("removeTask", this.props.task._id);
    // Tasks.remove(this.props.task._id);
  },

  togglePrivate() {
    Meteor.call("setPrivate", this.props.task._id, ! this.props.task.private);
  },

  render() {
    // give className depending on checked status for CSS styling
    const taskClassName = (this.props.task.checked ? "checked" : "") + " " +
      (this.props.task.private ? "private" : "");

    return(
      <li className={taskClassName}>
        <button className="delete" onClick={this.deleteThisTask}>
          &times;
        </button>

        <input
          type="checkbox"
          readOnly={true}
          checked={this.props.task.checked}
          onClick={this.toggleChecked} />

        { this.props.showPrivateButton ? (
          <button className="toggle-private" onClick={this.toggle-private}>
            { this.props.task.private ? "Private" : "Public" }
          </button>
          ) : ''}

        <span className="text">
          <strong>{this.props.task.username}</strong>: {this.props.task.text}
        </span>
      </li>
    );
  }
});
