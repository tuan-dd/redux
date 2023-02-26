import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';
import { sendDeletePost } from './postSlice';
import useAuth from '../../hooks/useAuth';
import { LoadingButton } from '@mui/lab';
export default function DeletePost({
   post,
   isDeleteCardShow,
   setIsDeleteCardShow,
}) {
   const handleClose = () => {
      setIsDeleteCardShow(false);
   };
   const dataPost = useSelector((state) => state.post);
   const { user } = useAuth();
   const dispatch = useDispatch();
   const handleAgree = async () => {
      const result = await dispatch(
         sendDeletePost(post._id, dataPost.currentPage, user._id),
      );
      if (result) setIsDeleteCardShow(false);
   };
   return (
      <div>
         <Dialog
            open={isDeleteCardShow}
            onClose={handleClose}
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
         >
            <DialogTitle id='alert-dialog-title'>
               This post will be permanently deleted are you sure?
            </DialogTitle>
            <DialogContent></DialogContent>
            <DialogActions>
               <Button onClick={handleClose}>Disagree</Button>
               <LoadingButton
                  onClick={handleAgree}
                  autoFocus
                  loading={dataPost.isLoading}
               >
                  Agree
               </LoadingButton>
            </DialogActions>
         </Dialog>
      </div>
   );
}
