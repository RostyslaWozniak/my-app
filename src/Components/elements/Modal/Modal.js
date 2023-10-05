import React, { useContext } from 'react';
import Button from '../Button/Button'
import { LoginContext } from '../../LoginContext';
import './Modal.css'

const Modal = () => {
    const { modal, setModal } = useContext(LoginContext)
    const handleCloseModal = () => {
        setModal(prev => ({
            ...prev,
            isVisible: false,
            value: "",
        }))
    }
    const handleAcceptModal = () => {
        console.log('accept')
    }
    const handleCancelModal = () => {
        console.log('cancel')
    }
    return ( 
        modal.isVisible ? (
        <div className="modal-container">
            <div className="modal-content">
                <Button
                        name="x"
                        className="close-button small"
                        onClick={handleCloseModal}
                    />
                    <p>{modal.value}</p>
                {
                    modal.buttons ? (
                        <div className="buttons">
                    <Button
                        name="cancel"
                        className="medium delete"
                        onClick={handleCancelModal}
                    />
                    <Button
                        name="ok"
                        className="medium accept"
                        onClick={handleAcceptModal}
                    />
                    </div>
                    )    :   (
                        <div className="button">
                        <Button
                            name="ok"
                            className="medium accept"
                            onClick={handleCloseModal}
                        />
                        </div>
                    )
                }
            </div>
        </div>
        )   :   (
            null
        )
     );
}
 
export default Modal;