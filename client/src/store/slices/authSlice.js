export const authSlice = (set) => ({
    userInfo : null ,
    setUserInfo : (userInfo) => set((state) => {
        if(state.userInfo !== userInfo) {
            return {userInfo}
        }
        return state;
    })
})