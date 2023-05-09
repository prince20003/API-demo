import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, CircularProgress, TablePagination } from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';

function Api() {
  const [udata, setUdata] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 1000);

    let i = 1;
    if (i < 50) {
      fetchData(`https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${0}`);
      setInterval(() => {
        fetchData(`https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${i}`);
        i++;
      }, 10000)
    }
  }, [])


  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 1000);

    const fetchIData = async () => {
      try {
        const res = await fetch(`https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${page}`);
        const data = await res.json();
        setUdata(data.hits);
      }
      catch (e) {
        console.error(e);
      }
    }
    fetchIData();
  }, [])

  const fetchData = async (url) => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      setUdata(data.hits);
    }
    catch (e) {
      console.error(e);
    }
  }


  const scrolld = async (url) => {
    setPage(page + 1);
    const fetchIData = async (url) => {
      try {
        const res = await fetch(`https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${page}`);
        const data = await res.json();
        setUdata(udata.concat(data.hits));
        console.log(page, "psss")
      }
      catch (e) {
        console.error(e);
      }
    }
    fetchIData();
  }

  const UsFormatter = new Intl.DateTimeFormat('en-US')



  return (
    <>
      <Box className='box'>
        <TableContainer component={Paper} sx={{ boxShadow: 5 }}>
          <InfiniteScroll
            dataLength={udata.length} //This is important field to render the next data
            next={scrolld}
            hasMore={true}
            loader={<h4>Loading...</h4>}>
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
          </InfiniteScroll>
        </TableContainer>
      </Box >


    </>
  )
}

export default Api