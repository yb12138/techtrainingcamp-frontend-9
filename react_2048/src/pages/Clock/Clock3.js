import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";

const styles = theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
});

class Clock3 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    }

    handleOpen = () => {
        let { open } = this.state.open
        this.setState({
            open: true
        })
    }

    handleClose = () => {
        let { open } = this.state.open
        this.setState({
            open: false
        })
    };

    render() {
        const {classes} = this.props;
        return (
            <div>
                <button type="button" onClick={this.handleOpen}>
                    Click
                </button>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={this.state.open}
                    onClose={this.handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={this.state.open}>
                        <div className={classes.paper}>
                            <h2 id="transition-modal-title">Time Over!</h2>
                            <p id="transition-modal-description">游戏时间到,点击下方查看您的最终得分排名.</p>
                        </div>
                    </Fade>
                </Modal>
            </div>
        );
    }
}

Clock3.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Clock3);