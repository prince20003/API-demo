import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, CircularProgress, TablePagination } from '@mui/material';

function Api() {
  const [udata, setUdata] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 1000);
    let i = 0;
    fetchData(`https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${0}`);
    setInterval(() => {
      fetchData(`https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${i}`);
      console.log(i, "i")
      i++
    }, 10000)
  }, [])


  // useEffect(() => {
  //   window.addEventListener("scroll", handleInfinite);
  //   return () => window.removeEventListener("scroll", handleInfinite)
  // })

  // const handleInfinite = async () => {
  //   try {
  //     if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
  //       setPage((pre) => pre + 1);
  //     }
  //   }
  //   catch (e) {
  //     console.error(e)
  //   }
  // }



  const fetchData = async (url) => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      // setUdata((pre) => [...pre, ...data.hits]);
      setUdata(data.hits);
    }
    catch (e) {
      console.error(e);
    }
  }

  const UsFormatter = new Intl.DateTimeFormat('en-US')



  return (
    <>
      <Box className='box'>
        <TableContainer component={Paper} sx={{ boxShadow: 5 }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ cursor: 'pointer', fontWeight: 800 }}
                >Title</TableCell>
                <TableCell sx={{ cursor: 'pointer', fontWeight: 800 }}
                >Author</TableCell>
                <TableCell sx={{ cursor: 'pointer', fontWeight: 800 }}
                >Created_at</TableCell>
              </TableRow>
            </TableHead>
            {
              loading ?
                <Box className='loder'>
                  < CircularProgress />
                </Box>
                :
                <TableBody>
                  {
                    udata?.map((row) => (
                      <TableRow
                        key={row.title}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">
                          {row?.title}
                        </TableCell>
                        <TableCell>{row?.author}</TableCell>
                        <TableCell>{UsFormatter.format(udata?.created_at)}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
            }
          </Table>
        </TableContainer>
      </Box >


    </>
  )
}

export default Api