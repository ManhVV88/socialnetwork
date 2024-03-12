import { Avatar, Box, Divider, Grid, TextField, Typography } from "@mui/material";
import BodyLeft from "./BodyLeft";
import BodyRight from "./BodyRight";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { ChangeEvent, ChangeEventHandler, useEffect, useRef, useState } from "react";
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import ReplyIcon from '@mui/icons-material/Reply';
import ImageAdd from "./Image/ImageAdd";

interface BodyProps {
  imageUrl: string;
}

const Body: React.FC<BodyProps> = ({ imageUrl }) =>{
  const image = imageUrl;

  const [emojiData, setEmojiData] = useState<EmojiClickData | null>(null);
  const [valueText, setValueText] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiPickerRef = useRef<HTMLDivElement | null>(null);
  const insertEmoticonRef = useRef<HTMLDivElement | null>(null);
  const [imageList, setImageList] = useState<string[]>([]);
  const [checkLength,setLength] = useState<string[]>([]);

  const handleFileSelection: ChangeEventHandler<HTMLInputElement> = (event) => {
    const fileList = event.target.files;
    if (fileList) {
      const fileArray = Array.from(fileList);      
      const urlPromises = fileArray.map((file) => {
        return new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
            const url = reader.result as string;
            resolve(url);
          };
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      });
  
      Promise.all(urlPromises)
        .then((urls) => {
          // const newUrls = [...imageList,...urls];
          // setLength(imageList);
          setImageList(urls);// Danh sách URL hình ảnh
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };
  useEffect(() => {
    // console.log(imageList.length); // Danh sách URL hình ảnh
    // setImageList(imageList);
  }, [imageList]);


  function onClick(emojiData: EmojiClickData, event: MouseEvent) {
    setValueText((prevValue) => prevValue + emojiData.emoji);
    setEmojiData(null);
  }


  function handleChangeValue(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
    const value = event.target.value;
    setValueText(value);
  }

  const handleEmoticonClick = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (emojiPickerRef.current
      && !emojiPickerRef.current.contains(event.target as Node)
      && insertEmoticonRef.current
      && !insertEmoticonRef.current.contains(event.target as Node)
    ) {
      setShowEmojiPicker(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <Grid
      container
      sx={{
        width: "100%",
        overflow:"auto",
        maxHeight :"93.5%",
        minHeight : {
          sm : "90%",
          xs :"90%",
          md :"90%",
          lg :"90%",
          xl :"90%"
        },
      }}>

      <Grid item xs={2} md={2} lg={2} xl={2} sx={{ display: { xs: 'none', md: 'flex' } , mb:2 }}>
        <Box sx={{width:"100%"}}>        
          <BodyLeft />
        </Box>
      </Grid>
      <Grid item xs={7} md={7} lg={7} xl={7} sx={{ display: "block", justifyContent: "flex-end", alignItems: "center" , mb:2}}>
        <Box sx={{
          width: {
            sm: "98vw",
            xs: "93.5vw",
            md: "56.5vw",
            lg: "56.5vw",
            xl: "58.4vw",
          },
          alignItems: "center",
          justifyContent: "center",
          mt: 2
        }}>
          <Box
            sx={{
              width: '98%',
              backgroundColor: 'rgba(0, 24, 57, 0.2)',
              boxShadow: '4px 4px 10px rgba(0,0,0,0.25)',
              backdropFilter: 'blur(10px)',
              ml: 2
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", color: "white", ml: 1, pt: 1, pb: 1 }}>
              <Avatar alt="manh" src={image} />
              <Typography sx={{ ml: 1, fontSize: 14, fontWeight: "1" }}>Bao To 2024</Typography>
            </Box>
            <Divider />
            <Box sx={{ ml: 1, mb: 1, pt: 1, position: "relative" }}>
              <Box
                sx={{
                  width: '100%',
                  maxWidth: '100%',
                  display: "flex",
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                }}
              >
                <TextField fullWidth label="New your content" id="fullWidth" value={valueText} sx={{ borderRadius: 10 }} onChange={handleChangeValue} />
                <Box sx={{ ml: 1, position: 'absolute' }} ref={insertEmoticonRef}>
                  <InsertEmoticonIcon sx={{ color: 'yellow', fontSize: 36, mr: 1.5 }} onClick={handleEmoticonClick} />
                </Box>
              </Box>
              {showEmojiPicker &&
                <Box sx={{ width: '100%', display: 'flex', justifyContent: "flex-end" }}>
                  <Box ref={emojiPickerRef} sx={{ position: 'absolute', mt: -1.7, pr: 3, zIndex: 2 }}>
                    <EmojiPicker onEmojiClick={onClick} />
                  </Box>
                </Box>

              }
            </Box>
            {
              
              imageList.length > 0 ? 
                <Box sx={{ mt: 1}}>
                  <ImageAdd images={imageList} count ={imageList.length}/>
                </Box>
               :   <></>
              
            }
            <Divider />
            <Box sx={{ height: '50px', mt: 1, display: 'flex', justifyContent: 'center' }} >
              <Box sx={{ display: 'flex', width: '90%' }}>
                <Grid sx={{ height: '50px', justifyContent: 'flex-start', width: '33%' }}>
                  <Box
                    onClick={() => {
                      const fileInput = document.getElementById('file-input');
                      if (fileInput) {
                        fileInput.click();
                      }
                    }} sx={{ display: 'flex', alignItems: 'center', height: '100%', '&:hover': { cursor: 'pointer' }, width: { sm: "70%", xs: "70%", md: "73%", lg: "55%", xl: "45%", } }}>
                    <AddPhotoAlternateIcon sx={{ fontSize: 36, color: '#45bd62' }} />
                    <Typography sx={{ fontWeight: '400', fontFamily: 'sans-serif', fontSize: '14px', color: 'white', display: { sm: 'none', xs: 'none', md: 'flex' } }}>Add Image</Typography>
                    <input
                      id="file-input"
                      type="file"
                      style={{ display: 'none' }}
                      onChange={handleFileSelection}
                      multiple
                    />
                  </Box>
                </Grid>
                <Grid xl={4} sx={{ display: 'flex', justifyContent: 'center', width: '34%' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', height: '100%', '&:hover': { cursor: 'pointer' }, width: { sm: "70%", xs: "70%", md: "70%", lg: "55%", xl: "45%", } }}>
                    <VideoCameraFrontIcon sx={{ fontSize: 36, color: '#e42645' }} />
                    <Typography sx={{ fontWeight: '400', fontFamily: 'sans-serif', fontSize: '14px', color: 'white', display: { sm: 'none', xs: 'none', md: 'flex' } }}>Video Live</Typography>
                  </Box>
                </Grid>
                <Grid xl={4} sx={{ display: 'flex', justifyContent: 'flex-end', width: '33%' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', height: '100%', '&:hover': { cursor: 'pointer' }, width: { sm: "73%", xs: "73%", md: "73%", lg: "55%", xl: "45%", } }}>
                    <ReplyIcon sx={{ fontSize: 36, color: '#0866ff', transform: 'scaleX(-1)' }} />
                    <Typography sx={{ fontWeight: '400', fontFamily: 'sans-serif', fontSize: '14px', color: 'white', display: { sm: 'none', xs: 'none', md: 'flex' } }}>Share Post</Typography>
                  </Box>
                </Grid>
              </Box>
            </Box>
          </Box>
        </Box>

      </Grid>
      <Grid item xs={3} md={3} lg={3} xl={3} sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: "flex-end" , mb:2}}>
        <Box sx={{width:"100%",display : 'flex', justifyContent:"flex-end"}}>        
                    
          <BodyRight />
        </Box>
      </Grid>
    </Grid>

  );
};

export default Body;