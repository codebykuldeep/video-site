import { Box } from "@mui/material";
import Image from "next/image";
import classes from "./search-page.module.css";
import CircleIcon from '@mui/icons-material/Circle';
import { VideoCreatorType } from "@/helper/commonTypes";
import { formatDate } from "@/helper/helperFns";
import Link from "next/link";

interface SearchCardProps{
  video:VideoCreatorType;
}

export default function SearchCard({video}:SearchCardProps) {
  return (
    <Link href={`/video/${video.id}`}>
    <Box className={classes.card}>
      <Box className={classes.image}>
        <Image
          src={video.image_url}
          width={500}
          height={280}
          alt={video.title}
        />
      </Box>
      <Box className={classes.detail}>
        <Box>
          {video.title}
        </Box>
        <Box>
          <span>{video.count} views</span>
          <span><CircleIcon /></span> <span>{formatDate(video.created_at)}</span>
        </Box>
        <Box className={classes.user}>
          <span>
            <Image
              src={video.image}
              height={30}
              width={30}
              alt={video.name}
            />
          </span>
          <span>
            {video.name}
          </span>
        </Box>
        <Box className={classes.description}>{video.description}</Box>
      </Box>
    </Box>
    </Link>
  );
}
