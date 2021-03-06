import {UserDBService} from "./UserDBService";
import {SuccessResponse} from "../Model/Response/SuccessResponse";
import {ErrorResponse} from "../Model/Response/ErrorResponse";
import {ResponseModel} from "../Model/Response/ResponseModel";
import { User } from "../Model/User/User";
import { Media } from "../Model/Media/Media";
import { Comment } from "../Model/Comment/Comment";
import { Genre } from "../Model/Genre/Genre";

export class UserBusiness {

    private userDBService: UserDBService;

    constructor(){
        this.userDBService = new UserDBService();
    }
    
    public async login(user: User): Promise<ResponseModel> {
        try {
            const username = user.username;
            const password = user.password;
            let result: User = await this.userDBService.login(username, password);
            return new SuccessResponse(result);
        } catch(error) {
            return new ErrorResponse(error);
        }
    }
    
    public async register(user: User, genres: Genre[]): Promise<ResponseModel> {
        try {
            let result = await this.userDBService.register(user, genres);
            return new SuccessResponse(result);
        } catch (error) {
            return new ErrorResponse(error);
        }
    }

    public async addComment(user: User, media: Media, comment: Comment): Promise<ResponseModel> {
        try {
            let result = await this.userDBService.addComment(user, media, comment);
            return new SuccessResponse(result);
        } catch (error) {
            return new ErrorResponse(error);
        }
    }

    public async getChannels(user: User): Promise<ResponseModel> {
        try {
            let result = await this.userDBService.getChannels(user);
            return new SuccessResponse(result);
        } catch (error) {
            return new ErrorResponse(error);
        }
    }

    public async getFriendActivities(user: User): Promise<ResponseModel> {
        try {
            let result = await this.userDBService.getFriendActivities(user);
            return new SuccessResponse(result);
        } catch (error) {
            return new ErrorResponse(error);
        }
    }

    public async rateMedia(user: User, media: Media, rate: number): Promise<ResponseModel> {
        try {
            let result = await this.userDBService.rateMedia(user, media, rate);
            return new SuccessResponse(result);
        } catch (error) {
            return new ErrorResponse(error);
        }
    }

    public async deleteComment(comment: Comment): Promise<ResponseModel> {
        try {
            let result = await this.userDBService.deleteComment(comment);
            return new SuccessResponse(result);
        } catch (error) {
            return new ErrorResponse(error);
        }
    }

    public async addGenre(user: User, genre: Genre): Promise<ResponseModel> {
        try {
            let result = await this.userDBService.addGenre(user, genre);
            return new SuccessResponse(result);
        } catch (error) {
            return new ErrorResponse(error);
        }
    }

    public async getUserGenres(user: User): Promise<ResponseModel>
    {
        try {
            let result = await this.userDBService.getUserGenres(user);
            return new SuccessResponse(result);
        } catch (error) {
            return new ErrorResponse(error);
        }
    }

    public async deleteGenre(user: User, genre: Genre): Promise<ResponseModel> {
        try {
            let result = await this.userDBService.deleteGenre(user, genre);
            return new SuccessResponse(result);
        } catch (error) {
            return new ErrorResponse(error);
        }
    }

    public async changePassword(user: User, newPassword: string): Promise<ResponseModel> {
        try {
            let result = await this.userDBService.changePassword(user, newPassword);
            return new SuccessResponse(result);
        } catch (error) {
            return new ErrorResponse(error);
        }
    }

    public async changeInfo(user: User, newUsername: string, newEmail: string, newUserType: string): Promise<ResponseModel> {
        try {
            let result = await this.userDBService.changeInfo(user, newUsername, newEmail, newUserType);
            return new SuccessResponse(result);
        } catch (error) {
            return new ErrorResponse(error);
        }
    }

    public async getFriendshipInvitations(user: User): Promise<ResponseModel> {
        try {
            let result = await this.userDBService.getFriendshipInvitations(user);
            return new SuccessResponse(result);
        } catch (error) {
            return new ErrorResponse(error);
        }
    }

    public async acceptFriendshipInvitation(user: User, inviter: string): Promise<ResponseModel> {
        try {
            let result = await this.userDBService.acceptFriendshipInvitation(user, inviter);
            return new SuccessResponse(result);
        } catch (error) {
            return new ErrorResponse(error);
        }
    }

    public async refuseFriendshipInvitation(user: User, inviter: string): Promise<ResponseModel> {
        try {
            let result = await this.userDBService.refuseFriendshipInvitation(user, inviter);
            return new SuccessResponse(result);
        } catch (error) {
            return new ErrorResponse(error);
        }
    }

    public async removeFriend(user: User, friend: string): Promise<ResponseModel> {
        try {
            let result = await this.userDBService.removeFriend(user, friend);
            return new SuccessResponse(result);
        } catch (error) {
            return new ErrorResponse(error);
        }
    }

    public async sendFriendshipInvitation(user: User, invited: string): Promise<ResponseModel> {
        try {
            let result = await this.userDBService.sendFriendshipInvitation(user, invited);
            return new SuccessResponse(result);
        } catch (error) {
            return new ErrorResponse(error);
        }
    }
    
    /*

    

    

    public async addFriend(mainUser: User, invitedUser: string): Promise<ResponseModel> {
        try {
            let result = await this.userDBService.addFriend(mainUser, invitedUser);
            return new SuccessResponse(result);
        } catch (error) {
            return new ErrorResponse(error);
        }
    }

    public async deleteFriend(mainUser: User, deletedUser: string): Promise<ResponseModel> {
        try {
            let result = await this.userDBService.deleteFriend(mainUser, deletedUser);
            return new SuccessResponse(result);
        } catch (error) {
            return new ErrorResponse(error);
        }
    }*/
}