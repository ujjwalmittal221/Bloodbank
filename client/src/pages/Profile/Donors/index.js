import React from 'react'
import { useDispatch } from 'react-redux';
import { SetLoading } from '../../../redux/loadersSlice';
import { message, Table } from 'antd';
import { GetAllDonorsOfAnOrganization } from '../../../apicalls/users';
import { getDateFormat } from '../../../utils/helper';



function Donors() {
    const [data, setData] = React.useState([]);
    const dispatch = useDispatch();

    const getData = async() =>{
        try {
          dispatch(SetLoading(true));
          const response = await GetAllDonorsOfAnOrganization();
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
            dataIndex: "name",
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
            title: "Created At",
            dataIndex: "createdAt",
            render: (text) => getDateFormat(text),
        }
      ];

  return (
    <div>
        <Table columns={columns} dataSource={data} />
    </div>
  )
}

export default Donors