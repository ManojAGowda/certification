import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useCallback, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import * as yup from 'yup';
import './style.css'

function AddCertificate({ showAddModal, hideShowAddModal, updateCertificateList }) {
    const [certificate, setCertificate] = useState({
        certificateName: '',
        certifiedBy: '',
        yearOfCompletion: ''
    });
    const [errors, setErrors] = useState({
        nameError: '',
        certifiedByError: '',
        yearError: '',
    })

    const validateName = useCallback(
        () => {
            if (certificate.certificateName) {
                if (certificate.certificateName.length < 5) {
                    setErrors({
                        ...errors,
                        nameError: 'Name should have minimum of 5 characters'
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
                    certifiedByError: 'Certifed From should have minimum of 5 characters'
                })
            }
            else{return true}
        }
        else {
            setErrors({
                certifiedByError: 'This field cannot be empty'
            })
        }
    }
    const validateYear = () => {
        if (certificate.yearOfCompletion) {
            if (!(certificate.yearOfCompletion >= 1950 && certificate.yearOfCompletion <= 2022)) {
                setErrors({
                    yearError: 'Year of Completion must be within 1951-2022'
                })
                return false;
            }
            else{return true}
        }
        else {
            setErrors({
                yearError: 'This field cannot be empty'
            })
            return false;
        }
    }

    let handleClose = () => {
        hideShowAddModal()
    }

    let handleChange = (event) => {
        setCertificate({
            ...certificate,
            [event.target.name]: event.target.value
        })
    }

    let addCertificate = () => {
        validateName();
        validateCertifiedBy();
        validateYear();
        if (validateName() && validateCertifiedBy() && validateYear()) {
            updateCertificateList(certificate)
            setCertificate({
                certificateName: '',
                certifiedBy: '',
                yearOfCompletion: ''
            })
            setErrors({
                nameError: '',
                certifiedByError: '',
                yearError: '',
            })
        }
    }

    return (
        <>
            <Modal className="rounded-start" show={showAddModal} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton>
                    <Modal.Title >Add Certification</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik>
                        {(props) => (
                            <Form>
                                <div>
                                    <label>Certification Name</label>
                                    <Field
                                        type="text"
                                        className="form-control mb-2"
                                        name="certificateName"
                                        placeholder='Enter Certification Name'
                                        value={certificate.certificateName}
                                        autoComplete='off'
                                        onChange={handleChange}
                                    />
                                    {errors.nameError && <div className='errMsg'>{errors.nameError}</div>}
                                    <p className='error'><ErrorMessage name="Name" /></p>
                                </div>
                                <div>
                                    <label>Certification From</label>
                                    <Field
                                        type="text"
                                        className="form-control mb-2"
                                        name="certifiedBy"
                                        autoComplete='off'
                                        placeholder='Enter Certified From'
                                        value={certificate.certifiedBy}
                                        onChange={handleChange}
                                    />
                                    {errors.certifiedByError && <div className='errMsg'>{errors.certifiedByError}</div>}
                                    <p className='error'><ErrorMessage name="Certified_By" /></p>
                                </div>
                                <div>
                                    <label>Year Of Completition</label>
                                    <Field
                                        type="number"
                                        className="form-control mb-2"
                                        name="yearOfCompletion"
                                        autoComplete='off'
                                        placeholder='Enter Year Of Completion'
                                        value={certificate.yearOfCompletion}
                                        onChange={handleChange}
                                    />
                                    {errors.yearError && <div className='errMsg'>{errors.yearError}</div>}
                                    <p className='error'><ErrorMessage name="YOC" /></p>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" className='btn-success' onClick={addCertificate} >
                        Add
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AddCertificate
