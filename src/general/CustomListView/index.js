import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import rigthArrow from './images/rigthArrow.png'

const styles = theme => ({
    root: {
        padding:'0',
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    ListOne:{
        borderBottom:'1px solid #ebebeb'

    },
    FirArc:{
        height:'100%'
    },
    FirImg:{
        margin: '5% 0',
        float:'left',
        width:'1.2em',
    },
    FirText:{
        float:'left',
        marginLeft:'2em',
        fontFamily: 'Roboto-Bold',
        '& > p':{
            margin:'0',
            fontSize:'16px',
            fontWeight:'bolder',
            letterSpacing:'1.08px'
        },
        '& > label':{
            fontSize:'12px'
        }
    },

    SecArc:{
        width:'50%',
        height:'100%'
    },
    SecActDiv:{
        height:'100%',
        width:'100%',
        padding:'0 0'
    },
    SecLabel:{
        marginTop:'1.6em',
        float:'right',
        fontSize:'0.8rem',
        fontFamily: 'Roboto-Bold',
        letterSpacing: '1px'
    },
    SecImg:{
        marginTop:'1.1em',
        float:'right',
        width:'1.2em'
    }
});

class CheckboxListSecondary extends React.Component {
    state = {
        checked: [1],
    };

    handleToggle = value => () => {
        const { checked } = this.state;
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        this.setState({
            checked: newChecked,
        });
    };

    render() {
        const { classes } = this.props;

        return (
            <List className={classes.root}>
                {this.props.item.map( value => (
                    <ListItem className={classes.ListOne} key={value.key} button>
                        <div onClick={ ()=>this.props.showDetails(value) } className={classes.FirArc}>
                            <img className = {classes.FirImg} src={this.props.frontIcon} alt = "icon" />
                            <div className={classes.FirText}>
                                <p className={classes.FirTextP} >{value.title}</p>
                                <label className={classes.FirTextLabel} >{value.detail}</label>
                            </div>
                        </div>

                        <ListItemSecondaryAction className={classes.SecArc}>
                            <div className = {classes.SecActDiv}>
                                <img className = {classes.SecImg} style={( value.state !== "DONE" )? {display:'block'}:{display:'none'} } src={rigthArrow} alt = "arrow"/>
                                <label className = {classes.SecLabel} style={( value.state !== "DONE" )? {color:'#0f0f0f'}:{color:'#00568C'} }>{( value.state !== "DONE" )? `${value.last} min left`: "see details" }</label>
                            </div>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
        );
    }
}

CheckboxListSecondary.propTypes = {
    classes: PropTypes.object.isRequired,
    frontIcon: PropTypes.string.isRequired,
    item: PropTypes.array.isRequired,
    showDetails:PropTypes.func.isRequired
};

export default withStyles(styles)(CheckboxListSecondary);