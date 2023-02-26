import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch } from 'react-redux';
import { LoadingButton } from '@mui/lab';
import { sendDeleteComment } from './commentSlice';
export default function DeleteComment({
   isDeleteCommentShow,
   comment,
   setIsDeleteCommentShow,
}) {
   const handleClose = () => {
      setIsDeleteCommentShow(false);
   };
   const dispatch = useDispatch();
   const handleAgree = async () => {
      // console.log(postIdOfComment);
      // console.log(currentPage);
      const result = await dispatch(sendDeleteComment(comment._id));
      if (result) setIsDeleteCommentShow(false);
   };
   return (
      <div>
         <Dialog
            open={isDeleteCommentShow}
            onClose={handleClose}
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
         >
            <DialogTitle id='alert-dialog-title'>
               This Comment will be permanently deleted are you sure?
            </DialogTitle>
            <DialogContent></DialogContent>
            <DialogActions>
               <Button onClick={handleClose}>Disagree</Button>
               <LoadingButton
                  onClick={handleAgree}
                  autoFocus
                  // loading={isLoading}
               >
                  Agree
               </LoadingButton>
            </DialogActions>
         </Dialog>
      </div>
   );
}
