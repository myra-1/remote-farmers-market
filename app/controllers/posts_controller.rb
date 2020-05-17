class PostsController < ApplicationController
  before_action :find_post, only: [:show, :update, :destroy, :add_tag]
  # before_action :authorize_request, only: [:create, :update, :destroy]
  #  ^^ UNCOMMENT AND KEEP THIS
  
  # GET /posts
  def index
    @posts = Post.all
    render json: @posts, include: :tags, status: :ok
  end
  
  # GET /posts/1
  def show
    # @post = Post.find(params[:id])
    # ^ DELETE THIS - made unnecessary bc of the find_post before_action
    render json: @post, include: :tags
  end

  def show_owner
    @owner = User.find(params[:user_id])
    render json: @owner.posts, include: :tags
  end
  
  #POST /posts
  def create
    @post = Post.new(post_params)

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
    # @post = Post.find(params[:id])
    # ^ DELETE THIS - made unnecessary bc of the find_post before_action
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
    # @post = Post.find(params[:id])
    # ^ DELETE THIS - made unnecessary bc of the find_post before_action
    @post.destroy
  end

  # def add_tag
  #   @tag = Tag.find(params[:tag_id])
  #   @post.tag << @tag
  #   render json: @post, include: :tags
  # end
  
  private

  def find_post
    @post = Post.find(params[:id])
  end
  
  def post_params
    params.require(:post).permit(:id, :title, :description, :img_url, :price, :quantity, :contact_info, :user_id, :tags)
  end

end
