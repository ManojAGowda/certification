import React, { useCallback, useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap';
import './style.css'

function EditCertificate({showEditModal,hideShowEditModal,updateCertificateAfterEdit,selectedCertificate}) {
    const [certificate, setCertificate] = useState({
        certificateName: '',
        certifiedBy: '',
        yearOfCompletion: ''
    });
    const [errors, setErrors] = useState({
        nameError: '',
        CertifiedByError: '',
        yearError: '',
    })

    const validateName = useCallback(
        () => {
            if (certificate.certificateName) {
                if (certificate.certificateName.length < 5) {
                    setErrors({
                        ...errors,
                        nameError: 'Certification-Name should have minimum of 5 characters'
                    })
                }
                else{return true}
                
            }
            else {
                setErrors({
                    nameError: 'This field cannot be empty'
                })
                return false;
            }
        },
        [certificate.certificateName],
    )
    const validateCertifiedBy = () => {
        if (certificate.certifiedBy) {
            if (certificate.certifiedBy.length < 5) {
                setErrors({
                    CertifiedByError: 'Certifed From should have minimum of 5 characters'
                })
            }
            else{return true}
        }
        else {
            setErrors({
                CertifiedByError: 'This field cannot be empty'
            })
        }
    }
    const validateYear = () => {
        if (certificate.yearOfCompletion) {
            if (!(certificate.yearOfCompletion > 1950 && certificate.yearOfCompletion < 2022)) {
                setErrors({
                    yearError: 'Year of Completion must be within 1951-2022'
                })
                return false;
            }
            else{return true}
        }
        else {
            setErrors({
                yearError: 'This Field cannot be empty'
            })
            return false;
        }
    }

    useEffect(() => {
        setCertificate({...selectedCertificate})
    }, [selectedCertificate])

    let handleChange = (event) => {
        setCertificate({
            ...certificate,
            [event.target.name]:event.target.value
        })
    }
    let handleClose = () => {
        hideShowEditModal()
    }

    let editCertificate=()=>{
        updateCertificateAfterEdit(certificate)
        setCertificate({
        certificateName: '',
        certifiedBy: '',
        yearOfCompletion: ''})
    }

    return (
        <div>
            <Modal show={showEditModal} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton>
                    <Modal.Title >Edit Certificate</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <div>
                        <label>Certification Name</label>
                            <input
                                type="text"
                                className="form-control mb-2"
                                name="certificateName"
                                placeholder='Enter Certificate Name'
                                value={certificate.certificateName}
                                onChange={handleChange}
                            />
                            {errors.nameError && <div className='errMsg'>{errors.nameError}</div>}
                        </div>
                        <div>
                            <label>Certification From</label>
                            <input
                                type="text"
                                className="form-control mb-2"
                                name="certifiedBy"
                                placeholder='Enter Certified From'
                                value={certificate.certifiedBy}
                                onChange={handleChange}
                            />
                            {errors.CertifiedByError && <div className='errMsg'>{errors.CertifiedByError}</div>}
                        </div>
                        <div>
                            <label>Year Of Completition</label>
                            <input
                                type="number"
                                className="form-control mb-2"
                                name="yearOfCompletion"
                                placeholder='Enter Year Of Completion'
                                value={certificate.yearOfCompletion}
                                onChange={handleChange}
                            />
                            {errors.yearError && <div className='errMsg'>{errors.yearError}</div>}
                        </div>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" className='btn-success' onClick={editCertificate}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default EditCertificate
