import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

export default function efautlLoadingTable(){
    return (
        <Box sx={{ margin: 0, padding: 0 }}>
            <Box sx={{ margin: 0, padding: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Skeleton variant="rounded" width={'10%'} height={40} />
                <Skeleton variant="rounded" width={'10%'} height={40} />
                <Skeleton variant="rounded" width={'10%'} height={40} />
                <Skeleton variant="rounded" width={'10%'} height={40} />
                <Skeleton variant="rounded" width={'10%'} height={40} />
                <Skeleton variant="rounded" width={'10%'} height={40} />
                <Skeleton variant="rounded" width={'10%'} height={40} />
                <Skeleton variant="rounded" width={'10%'} height={40} />
                <Skeleton variant="rounded" width={'10%'} height={40} />
            </Box>
            <Box sx={{ margin: 0, padding: 0, display: 'flex', flexDirection: 'column',justifyContent: 'space-between', alignItems: 'center' }}>
                <Skeleton variant="rounded" width={'100%'} height={60} sx={{ marginTop: 1 }} />
                <Skeleton variant="rounded" width={'100%'} height={60} sx={{ marginTop: 1 }} />
                <Skeleton variant="rounded" width={'100%'} height={60} sx={{ marginTop: 1 }} />
                <Skeleton variant="rounded" width={'100%'} height={60} sx={{ marginTop: 1 }} />
                <Skeleton variant="rounded" width={'100%'} height={60} sx={{ marginTop: 1 }} />
            </Box>
            <Box sx={{ margin: 0, padding: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Skeleton variant="rounded" width={'90%'} height={60} sx={{ marginTop: 1, marginRight: 1, }} />
                <Skeleton variant="rounded" width={'10%'} height={60} sx={{ marginTop: 1 }} />
            </Box>
        </Box>
    )
}