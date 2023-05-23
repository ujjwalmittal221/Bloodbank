import React from 'react'
import { GetAllOrganizationsOfADonor, GetAllOrganizationsOfAHospital } from '../../../apicalls/users';
import { SetLoading } from '../../../redux/loadersSlice';
import { useDispatch, useSelector } from 'react-redux';
import { message, Modal, Table } from 'antd';
import { getDateFormat } from '../../../utils/helper';
import InventoryTable  from '../../../components/InventoryTable';

function Organizations({userType}) {
  const [showHistoryModel, setShowHistoryModel] = React.useState(false);
  const { currentUser } = useSelector((state) => state.users);
  const [selectedOrganization, setSelectedOrganization] = React.useState(null);
  const [data, setData] = React.useState([]);
    const dispatch = useDispatch();

    const getData = async() =>{
        try {
          dispatch(SetLoading(true));
          let response = null;
          if (userType==="hospital"){
            response = await GetAllOrganizationsOfAHospital();
          }
          else{
            response = await GetAllOrganizationsOfADonor();
          }
          dispatch(SetLoading(false));
          if(response.success) {
            setData(response.data);
          }
          else{
            throw new Error(response.message);
          }
        } catch (error) {
          message.error(error.message);
          dispatch(SetLoading(false));
        }
      };
  
      React.useEffect(() => {
        getData();
      }, []);

      const columns = [
        {
            title: "Name",
            dataIndex: "organizationName",
        },
        {
            title: "Email",
            dataIndex: "email",
        },
        {
            title: "Phone",
            dataIndex: "phone",
        },
        {
          title: "address",
          dataIndex: "address",
        },
        {
            title: "Created At",
            dataIndex: "createdAt",
            render: (text) => getDateFormat(text),
        },
        {
            title: "Action",
            dataIndex: "action",
            render: (text, record) => (
              <span
                className='underline text-md cursor-pointer'
                onClick={() => {
                  setSelectedOrganization(record);
                  setShowHistoryModel(true);
                }}
              >
                History
              </span>
            )
        }
      ];

  return (
    <div>
        <Table columns={columns} dataSource={data} />

        {showHistoryModel && (
          <Modal
            title = {
              `${
                userType === "donor"
                ? "Donations History"
                : "Consumptions History"
              } In ${selectedOrganization.organizationName}`
            }
            centered
            open={showHistoryModel}
            onClose={() => setShowHistoryModel(false)}
            width={1000}
            onCancel={() => setShowHistoryModel(false)} 
          >
            <InventoryTable
              filters = {{
                organization: selectedOrganization._id,
                [userType]: currentUser._id,
              }}
            />
          </Modal>
        )}
    </div>
  )

}

export default Organizations