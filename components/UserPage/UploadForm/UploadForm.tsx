import { FormControl, InputLabel, MenuItem, TextField } from '@mui/material';
import classes from './upload-video.module.css'
import React, { useState } from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { ChangeEvent, VideoFormType } from '@/helper/commonTypes';

interface UploadFormProps{
  handleChange:(event:ChangeEvent)=>void;
  handleBlur:(event:React.FocusEvent< HTMLInputElement>)=>void;
  handleMedia:(name:string)=>void;
  formState:VideoFormType;
}

export default function UploadForm({formState,handleChange,handleMedia}:UploadFormProps) {
    
    
    //  const [image,setImage] =useState<any>(null)
    //  const [video,setVideo] =useState<any>(null)
    const [sizeError,setSizeError] =useState(false);
  
  const handleCategory = (event: SelectChangeEvent) => {
    handleChange((event as unknown) as ChangeEvent);
  };

  function handleFileCheck(event:React.ChangeEvent<HTMLInputElement>){
    let file;
    if(event.target.files){
      file =event.target.files[0];
      // setVideo(file);
      handleMedia('video');
    }
    if(file){
      
      if(file.size >= 50*1024*1024){
        setSizeError(true)
      }
    }
    if(sizeError){
      setSizeError(false);
    }
  }

  function handleImage(event:React.ChangeEvent<HTMLInputElement>){
    if(event.target.files){
      // setImage(event.target.files[0]);
      handleMedia('image');
    }
  }

  
  return (
    <>
      <div>
        <TextField
          className={classes.input}
          name="title"
          id="title"
          label="Video Title"
          variant="outlined"
          onChange={handleChange}
          defaultValue={formState.title.value}
          error={formState.title.status}
          helperText={formState.title.message}
        />
      </div>
      <div>
        <TextField
          className={classes.input}
          id="description"
          name="description"
          label="Description"
          multiline
          rows={6}
          
          placeholder="Enter your video description"
          onChange={handleChange}
          defaultValue={formState.description.value}
          error={formState.description.status}
          helperText={formState.description.message}
        />
      </div>
      <div>
        <FormControl fullWidth>
          <InputLabel id="category">Category</InputLabel>
          <Select
            className={classes.input}
            labelId="category"
            id="category"
            label="Category"
            name="category"
            onChange={handleCategory}
            value={formState.category.value}
            error={formState.category.status}
          >
            {categoryList.map(({ id, label, value }) => (
              <MenuItem key={id} value={value}>
                {label}
              </MenuItem>
            ))}
          </Select>
          {formState.category.status && <p className={classes.error}>{formState.category.message}</p>}
        </FormControl>
      </div>
      <div>
        <div className={classes.upload}>
          <label htmlFor="image">Thumbnail</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/png, image/gif, image/jpeg"
            onChange={handleImage}
            
          />
          {formState.image.status && <p className={classes.error}>{formState.image.message}</p>}
        </div>
        <div className={classes.upload}>
          <label htmlFor="video">Video</label>
          <input
            type="file"
            id="video"
            name="video"
            accept="video/mp4,video/x-m4v,video/*"
            onChange={handleFileCheck}
          />
          {formState.video.status && <p className={classes.error}>{formState.video.message}</p>}
          {sizeError && <p className={classes.error}>File size should be under 50Mb</p>}
        </div>
      </div>
    </>
  );
}





const categoryList = [
    {
        id: 1,
        label: 'Entertainment',
        value: 'entertainment',
    },
    {
        id: 2,
        label: 'Education',
        value: 'education',
    },
    {
        id: 3,
        label: 'Sports',
        value: 'sports',
    },
    {
        id: 4,
        label: 'Music',
        value: 'music',
    },
    {
        id: 5,
        label: 'News',
        value: 'news',
    },
    {
        id: 6,
        label: 'Technology',
        value: 'technology',
    },
    {
        id: 7,
        label: 'Gaming',
        value: 'gaming',
    },
    {
        id: 8,
        label: 'Comedy',
        value: 'comedy',
    },
    {
        id: 9,
        label: 'Documentary',
        value: 'documentary',
    },
    {
        id: 10,
        label: 'Lifestyle',
        value: 'lifestyle',
    },
    {
        id: 11,
        label: 'Cooking',
        value: 'cooking',
    },
    {
        id: 12,
        label: 'Fitness',
        value: 'fitness',
    },
    {
        id: 13,
        label: 'Travel',
        value: 'travel',
    },
    {
        id: 14,
        label: 'Arts & Crafts',
        value: 'arts-crafts',
    },
    {
        id: 15,
        label: 'Health',
        value: 'health',
    },
];

