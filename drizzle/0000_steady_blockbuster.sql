CREATE TABLE "coupons" (
	"id" text PRIMARY KEY NOT NULL,
	"code" text NOT NULL,
	"discount" numeric(5, 2) NOT NULL,
	"expires_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "dao_proposals" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"status" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "digital_downloads" (
	"id" text PRIMARY KEY NOT NULL,
	"order_id" text NOT NULL,
	"token" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"download_count" integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE "orders" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"total" numeric(18, 2) NOT NULL,
	"status" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "products" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"price" numeric(18, 2) NOT NULL,
	"image" text,
	"stock" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "reviews" (
	"id" text PRIMARY KEY NOT NULL,
	"product_id" text NOT NULL,
	"user_id" text NOT NULL,
	"rating" integer NOT NULL,
	"comment" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "shipping_orders" (
	"id" text PRIMARY KEY NOT NULL,
	"order_id" text NOT NULL,
	"address" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "visitors" (
	"wallet_address" text PRIMARY KEY NOT NULL,
	"ens_name" text,
	"ip_address" text,
	"country" text,
	"city" text,
	"region" text,
	"timezone" text,
	"isp" text,
	"is_vpn" boolean,
	"user_agent" text,
	"device_type" text,
	"browser" text,
	"screen_resolution" text,
	"referrer_url" text,
	"wallet_type" text,
	"chain_id" integer,
	"siwe_signature" text,
	"session_cookie_id" text,
	"first_seen" timestamp DEFAULT now(),
	"last_seen" timestamp DEFAULT now(),
	"total_orders" integer DEFAULT 0,
	"total_spent_usd" numeric(18, 2) DEFAULT '0'
);
