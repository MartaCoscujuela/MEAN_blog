import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../post.model';
import { PostsService } from '../post.service';
import { Subscription } from 'rxjs';
@Component({
  selector: "app-post-list",
  templateUrl: "./post-list.component.html",
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
/*  posts = [
    { title: "First Post", content: "This is the first post content" },
    { title: "Second Post", content: "This is the second post content" },
    { title: "Third Post", content: "This is the third post content" },
  ];*/

  posts: Post[] = [];
  private postsSub: Subscription;
  constructor(public postsService: PostsService) {};

  ngOnInit(){
    this.posts = this.postsService.getPosts();
    this.postsSub = this.postsService.getPostsUpdateListened().subscribe((posts)=>{
      this.posts = posts;
    });
  }

  ngOnDestroy(){
    this.postsSub.unsubscribe();
  }
}
