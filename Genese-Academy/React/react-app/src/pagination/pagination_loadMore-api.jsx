import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Card from "@material-ui/core/Card/Card";
import CardHeader from "@material-ui/core/CardHeader/CardHeader";
import Avatar from "@material-ui/core/Avatar/Avatar";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import FormControl from "@material-ui/core/FormControl/FormControl";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Select from "@material-ui/core/Select/Select";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import {Button} from "@material-ui/core";

export default function PaginationLoadMore() {

    const [pageState,setPageState]=useState({
        pageNumber:0,
        isLoading:true,
        isError:false,
        pageData:[],
        totalPage:10,
        pageSize:10,
        isLoadingMoreData:false
    });

    const handleChangePage = () => {
        pageState.pageNumber=pageState.pageNumber+1;
        pageState.isLoadingMoreData=true;
       setPageState({...pageState,pageState});
    };

    useEffect(()=>{
       getData();
    },[pageState.pageNumber]);

    const getData=()=>{
        axios.get('https://api.instantwebtools.net/v1/passenger?page='+pageState.pageNumber+'&size='+pageState.pageSize).then(function (response) {
          pageState.isLoading=false;
          let newData = pageState.pageData.concat(response.data.data);
          pageState.isLoadingMoreData=false;
          pageState.pageData=newData;
          pageState.totalPage=response.data.totalPages;
          setPageState({...pageState,pageState});

        });
    };

    const handleChange = (event) => {
        pageState.pageSize=event.target.value;
        setPageState({...pageState,pageState});
        getData();
    };

    return (
        <div style={{maxWidth:700,margin:'auto'}}>
            <div>
                <FormControl  fullWidth>
                    <InputLabel id="demo-simple-select-label">Page Size</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        fullWidth={true}
                        value={pageState.pageSize}
                        onChange={handleChange}
                    >
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={50}>50</MenuItem>
                        <MenuItem value={100}>100</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <div>
                {pageState.isLoading ? <CircularProgress/> :
                    pageState.pageData.map((item)=>
                        <Card style={{marginTop:20}} key={item._id}>
                            <CardHeader
                                avatar={
                                    <Avatar aria-label="recipe">
                                        {item.logo}
                                    </Avatar>
                                }
                                title={item.name}
                                subheader={"Trip: "+item.trips}
                            />
                        </Card>
                    )

                }

            <div style={{margin:'20px 0px'}}>
                {pageState.isLoadingMoreData ? <CircularProgress/> :
                    <Button variant="contained" color="primary" onClick={handleChangePage}>Load More</Button>
                }
            </div>
            </div>
        </div>
    )

}
