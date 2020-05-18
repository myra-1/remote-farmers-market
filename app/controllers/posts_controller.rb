class PostsController < ApplicationController
  before_action :find_post, only: [:show, :update, :destroy, :add_tag]
  before_action :authorize_request, only: [:create, :update, :destroy]
  
  # GET /posts
  def index
    @posts = Post.all
    render json: @posts, include: :tags, status: :ok
  end
  
  # GET /posts/1
  def show
    render json: @post, include: :tags
  end

  def show_owner
    @owner = User.find(params[:user_id])
    render json: @owner.posts, include: :tags
  end
  
  #POST /posts
  def create
    @post = Post.new(post_params.merge(user: @current_user))

    if params.has_key?(:tags)
      @post.tags.clear
      params[:tags].each do |t|
        @post.tags << Tag.find(t)
      end
    end

    if @post.save
    render json: @post, status: :created, location: @post, include: :tags
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end
  
  #PUT /posts/1
  def update
    if params.has_key?(:tags)
      @post.tags.clear
      params[:tags].each do |t|
        @post.tags << Tag.find(t)
      end
    end
    
    if @post.update(post_params)
      render json: @post, include: :tags
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end
  
  #DELETE /posts/1
  def destroy
    @post.destroy
  end
  
  private

  def find_post
    @post = Post.find(params[:id])
  end
  
  def post_params
    params.require(:post).permit(:id, :title, :description, :img_url, :price, :quantity, :contact_info, :user_id, :tags)
  end

end
