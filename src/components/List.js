import React, { useState } from 'react'
import { Table } from 'react-bootstrap'
import AddCertificate from './AddCertificate';
import EditCertificate from './EditCertificate';
import './style.css'

function List() {
    const [certificateList, setCertificateList] = useState([])
    const [showAddModal, setshowAddModal] = useState(false);
    const [showEditModal, setshowEditModal] = useState(false);
    const [selectedCertificate, setSelectedCertificate] = useState({})
    const [selectedCertificateIndex, setSelectedCertificateIndex] = useState('')

    
    let updateShowAddModal = () => {
        
        setshowAddModal(true)
    }
    let hideShowAddModal = () => {
        setshowAddModal(false);
    };

    let updateCertificateList = (certificate) => {
        
        let certificateCopy = [...certificateList]
        certificateCopy.push(certificate)
        setCertificateList(certificateCopy)
        alert("Certificate Added Successfully!!")
    }

    
    let updateCertificateAfterEdit = async (certificate) => {
        let certificateCopy = [...certificateList]
        certificateCopy.splice(selectedCertificateIndex, 1, certificate)
        setCertificateList(certificateCopy)
        setSelectedCertificateIndex('')
        setshowEditModal(false)
        alert("Certificate Changes Updated Successfully!!")
    }
    let updateShowEditModal = (certificate, index) => {
        setshowEditModal(true)
        setSelectedCertificateIndex(index)
        setSelectedCertificate(certificate)
    }
    let hideShowEditModal = () => {
        setshowEditModal(false)
    }

    let deleteCertificate = (index) => {
         {
            let certificateCopy = [...certificateList]
            certificateCopy.splice(index, 1)
            setCertificateList(certificateCopy)
        }
    }


    return (
        <div>
            <Table striped hover>
                <thead className='border-bottom'>
                    <tr>
                        <th>Id</th>
                        <th>Certification Name</th>
                        <th>Certified From</th>
                        <th>Year Of Completion</th>
                        <th><button className="add-bn border border-3" onClick={updateShowAddModal}>+</button></th>
                    </tr>
                </thead>
                <tbody>
                    {certificateList.length > 0 ? certificateList.map((person, idx) => {
                        return <tr key={idx}>
                            <td>{idx + 1}</td>
                            <td>{person.certificateName}</td>
                            <td>{person.certifiedBy}</td>
                            <td>{person.yearOfCompletion}</td>
                            <td><i className="bi bi-pencil-square me-3" onClick={() => updateShowEditModal(person, idx)}></i>
                                <i className="bi bi-trash" onClick={() => deleteCertificate(idx)}></i></td>
                        </tr>
                    })  : <tr>
                        <td></td>
                        <td></td>
                        <td className="no certificate"></td>
                        <td></td>
                        <td></td></tr>}


                        
                </tbody>
            </Table>

            <AddCertificate showAddModal={showAddModal}
                hideShowAddModal={hideShowAddModal}
                updateCertificateList={updateCertificateList}
            />

            <EditCertificate showEditModal={showEditModal}
                hideShowEditModal={hideShowEditModal}
                updateCertificateAfterEdit={updateCertificateAfterEdit}
                selectedCertificate={selectedCertificate}
            />
        </div>
    )
}

export default List
