"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Modal, Box, Typography } from "@mui/material";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function CustomerPage() {
  const API_BASE = process.env.NEXT_PUBLIC_API_URL;
  const { register, handleSubmit, reset } = useForm();
  const [customers, setCustomers] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [open, setOpen] = useState(false);

  const columns = [
    { field: 'name', headerName: 'Name', width: 150 },
    { 
      field: 'dateOfBirth', 
      headerName: 'Date of Birth', 
      width: 150,
      renderCell: (params) => {
        return params.row.dateOfBirth ? 
          new Date(params.row.dateOfBirth).toLocaleDateString() : 
          '';
      }
    },
    { field: 'memberNumber', headerName: 'Member Number', width: 150 },
    { field: 'interests', headerName: 'Interests', width: 200 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => (
        <div className="flex gap-2">
          <Link href={`/customer/${params.row._id}`}>
            <button className="bg-blue-500 text-white px-2 py-1 rounded">View</button>
          </Link>
          <button 
            onClick={() => startEditMode(params.row)}
            className="bg-yellow-500 text-white px-2 py-1 rounded"
          >
            Edit
          </button>
          <button 
            onClick={() => deleteCustomer(params.row)}
            className="bg-red-500 text-white px-2 py-1 rounded"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  async function fetchCustomers() {
    try {
      const response = await fetch(`${API_BASE}/customer`);
      const data = await response.json();
      
      const processedData = data.map(customer => ({
        ...customer,
        id: customer._id
      }));
      
      setCustomers(processedData);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  }

  async function deleteCustomer(customer) {
    if (!confirm(`Are you sure you want to delete ${customer.name}?`)) return;
    
    await fetch(`${API_BASE}/customer/${customer._id}`, {
      method: 'DELETE'
    });
    fetchCustomers();
  }

  function startEditMode(customer) {
    const date = new Date(customer.dateOfBirth);
    const formattedCustomer = {
      ...customer,
      dateOfBirth: date.toISOString().split('T')[0] // Format as YYYY-MM-DD for input field
    };
    
    reset(formattedCustomer);
    setEditMode(true);
    setOpen(true);
  }

  async function handleCustomerSubmit(data) {
    console.log('Form submission data:', data); // Debug log

    if (!data.dateOfBirth) {
      alert('Please enter a date');
      return;
    }

    try {
      const date = new Date(data.dateOfBirth);
      if (isNaN(date.getTime())) {
        alert('Please enter a valid date');
        return;
      }

      // Format the date to ISO string for database storage
      const formattedData = {
        ...data,
        dateOfBirth: date.toISOString()
      };

      await fetch(`${API_BASE}/customer`, {
        method: editMode ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formattedData)
      });
      
      setOpen(false);
      setEditMode(false);
      reset();
      fetchCustomers();
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error saving customer data');
    }
  }

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <main className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Customer Management</h1>
        <Button 
          variant="contained" 
          onClick={() => {
            reset();
            setEditMode(false);
            setOpen(true);
          }}
        >
          Add New Customer
        </Button>
      </div>

      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={customers}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
        />
      </div>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
        <Box sx={style}>
          <Typography variant="h6" component="h2" className="mb-4">
            {editMode ? 'Edit Customer' : 'Add New Customer'}
          </Typography>
          <form onSubmit={handleSubmit(handleCustomerSubmit)} className="space-y-4">
            <div>
              <label className="block mb-1">Name:</label>
              <input
                {...register("name", { required: true })}
                className="w-full p-2 border rounded"
              />
            </div>
            
            <div>
              <label className="block mb-1">Date of Birth:</label>
              <input
                type="date"
                defaultValue={new Date().toISOString().split('T')[0]}
                {...register("dateOfBirth", { required: true })}
                className="w-full p-2 border rounded"
              />
            </div>
            
            <div>
              <label className="block mb-1">Member Number:</label>
              <input
                type="number"
                {...register("memberNumber", { required: true })}
                className="w-full p-2 border rounded"
              />
            </div>
            
            <div>
              <label className="block mb-1">Interests:</label>
              <input
                {...register("interests", { required: true })}
                placeholder="e.g., movies, football, gym, gaming"
                className="w-full p-2 border rounded"
              />
            </div>
            
            <div className="flex justify-end gap-2 mt-4">
              <Button onClick={() => setOpen(false)}>Cancel</Button>
              <Button type="submit" variant="contained">
                {editMode ? 'Update' : 'Add'}
              </Button>
            </div>
          </form>
        </Box>
      </Modal>
    </main>
  );
}