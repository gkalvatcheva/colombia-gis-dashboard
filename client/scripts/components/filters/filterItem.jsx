
/*http://facebook.github.io/react/docs/component-specs.html*/
var React = require('react');
var Router = require('react-router');
var Reflux = require('reflux');
var Link = Router.Link;
var FilterActions = require('../../actions/filterActions.js');
var FilterStore=require('../../stores/filterStore.js')

function getStateFromStores() {
  return {};
}

var FilterItem = React.createClass({
 
    mixins: [Reflux.connect(FilterStore)],

    componentDidMount: function() {
        //FilterStore.addChangeListener(this._onChange);
    },

    _onChange: function() {
       //this.setState(getStateFromStores());
    },
    
    _onItemChanged: function(event) {     
        FilterActions.changeFilterItemSelection(this.props.filterType, event.target.value, event.target.checked);
    },

    componentWillMount :function(){
        this.setState(getStateFromStores());
    },

    componentWillUnmount: function() {
    },

    componentDidUpdate:function( prevProps,  prevState){
    },
 
    render: function() {
        var item = this.props.data;       
        return(
            <label className="checkbox-inline">
            <input
                className="toggle"
                type="checkbox"
                checked={item.selected}
                onChange={this._onItemChanged}
                value={item.id} />
                {item.name}
            </label>
                        
        );
    }
});

module.exports = FilterItem;