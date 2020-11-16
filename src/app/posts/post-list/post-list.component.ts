import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../post.model';
import { PostsService } from '../post.service';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: "app-post-list",
  templateUrl: "./post-list.component.html",
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

  posts: Post[] = [];
  private postsSub: Subscription;
  constructor(public postsService: PostsService) {};
  isLoading = false;
  totalPosts = 0;
  postPerPage = 2;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];

  ngOnInit(){
    this.isLoading = true;
    this.postsService.getPosts(this.postPerPage, this.currentPage);
    this.postsSub = this.postsService.getPostsUpdateListened().subscribe((postData: {posts:Post[], postCount: number})=>{
      this.isLoading = false;
      this.posts = postData.posts;
      this.totalPosts = postData.postCount;
    });
  }

  onChangedPage(pageData: PageEvent){
    this.isLoading = true;
    this.currentPage = pageData.pageIndex+1;
    this.postPerPage = pageData.pageSize;
    this.postsService.getPosts(this.postPerPage, this.currentPage);
  }

  onDelete(postId: string){
    this.isLoading = true;
    this.postsService.deletePost(postId).subscribe(()=>{
      this.postsService.getPosts(this.postPerPage, this.currentPage);
    });
  }

  ngOnDestroy(){
    this.postsSub.unsubscribe();
  }
}
