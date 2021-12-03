namespace MapEditor.Forms
{
    partial class MapEditor
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.label1 = new System.Windows.Forms.Label();
            this.tb_tile_width = new System.Windows.Forms.TextBox();
            this.tb_tile_height = new System.Windows.Forms.TextBox();
            this.label2 = new System.Windows.Forms.Label();
            this.groupBox1 = new System.Windows.Forms.GroupBox();
            this.menuStrip1 = new System.Windows.Forms.MenuStrip();
            this.文件ToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.打开ToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.保存ToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.另存为ToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.退出ToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.设置ToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.toolStripMenuItem1 = new System.Windows.Forms.ToolStripMenuItem();
            this.rb_normal = new System.Windows.Forms.RadioButton();
            this.rb_occlude = new System.Windows.Forms.RadioButton();
            this.rb_obstacle = new System.Windows.Forms.RadioButton();
            this.rb_fill = new System.Windows.Forms.RadioButton();
            this.groupBox1.SuspendLayout();
            this.menuStrip1.SuspendLayout();
            this.SuspendLayout();
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Location = new System.Drawing.Point(6, 30);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(29, 12);
            this.label1.TabIndex = 0;
            this.label1.Text = "宽度";
            // 
            // tb_tile_width
            // 
            this.tb_tile_width.Location = new System.Drawing.Point(41, 27);
            this.tb_tile_width.Name = "tb_tile_width";
            this.tb_tile_width.Size = new System.Drawing.Size(43, 21);
            this.tb_tile_width.TabIndex = 1;
            this.tb_tile_width.Text = "64";
            this.tb_tile_width.TextChanged += new System.EventHandler(this.tb_tile_width_TextChanged);
            this.tb_tile_width.KeyPress += new System.Windows.Forms.KeyPressEventHandler(this.tb_tile_width_KeyPress);
            this.tb_tile_width.MouseLeave += new System.EventHandler(this.tb_tile_width_MouseLeave);
            // 
            // tb_tile_height
            // 
            this.tb_tile_height.Location = new System.Drawing.Point(158, 27);
            this.tb_tile_height.Name = "tb_tile_height";
            this.tb_tile_height.Size = new System.Drawing.Size(43, 21);
            this.tb_tile_height.TabIndex = 3;
            this.tb_tile_height.Text = "64";
            this.tb_tile_height.TextChanged += new System.EventHandler(this.tb_tile_height_TextChanged);
            this.tb_tile_height.KeyPress += new System.Windows.Forms.KeyPressEventHandler(this.tb_tile_height_KeyPress);
            this.tb_tile_height.MouseLeave += new System.EventHandler(this.tb_tile_height_MouseLeave);
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Location = new System.Drawing.Point(123, 30);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(29, 12);
            this.label2.TabIndex = 2;
            this.label2.Text = "高度";
            // 
            // groupBox1
            // 
            this.groupBox1.Controls.Add(this.label1);
            this.groupBox1.Controls.Add(this.tb_tile_height);
            this.groupBox1.Controls.Add(this.tb_tile_width);
            this.groupBox1.Controls.Add(this.label2);
            this.groupBox1.Location = new System.Drawing.Point(7, 28);
            this.groupBox1.Name = "groupBox1";
            this.groupBox1.Size = new System.Drawing.Size(231, 64);
            this.groupBox1.TabIndex = 4;
            this.groupBox1.TabStop = false;
            this.groupBox1.Text = "瓦片";
            // 
            // menuStrip1
            // 
            this.menuStrip1.Items.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.文件ToolStripMenuItem,
            this.设置ToolStripMenuItem});
            this.menuStrip1.Location = new System.Drawing.Point(0, 0);
            this.menuStrip1.Name = "menuStrip1";
            this.menuStrip1.Size = new System.Drawing.Size(800, 25);
            this.menuStrip1.TabIndex = 5;
            this.menuStrip1.Text = "menuStrip1";
            // 
            // 文件ToolStripMenuItem
            // 
            this.文件ToolStripMenuItem.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.toolStripMenuItem1,
            this.打开ToolStripMenuItem,
            this.保存ToolStripMenuItem,
            this.另存为ToolStripMenuItem,
            this.退出ToolStripMenuItem});
            this.文件ToolStripMenuItem.Name = "文件ToolStripMenuItem";
            this.文件ToolStripMenuItem.Size = new System.Drawing.Size(44, 21);
            this.文件ToolStripMenuItem.Text = "文件";
            // 
            // 打开ToolStripMenuItem
            // 
            this.打开ToolStripMenuItem.Name = "打开ToolStripMenuItem";
            this.打开ToolStripMenuItem.Size = new System.Drawing.Size(180, 22);
            this.打开ToolStripMenuItem.Text = "打开";
            // 
            // 保存ToolStripMenuItem
            // 
            this.保存ToolStripMenuItem.Name = "保存ToolStripMenuItem";
            this.保存ToolStripMenuItem.Size = new System.Drawing.Size(180, 22);
            this.保存ToolStripMenuItem.Text = "保存";
            // 
            // 另存为ToolStripMenuItem
            // 
            this.另存为ToolStripMenuItem.Name = "另存为ToolStripMenuItem";
            this.另存为ToolStripMenuItem.Size = new System.Drawing.Size(180, 22);
            this.另存为ToolStripMenuItem.Text = "另存为";
            // 
            // 退出ToolStripMenuItem
            // 
            this.退出ToolStripMenuItem.Name = "退出ToolStripMenuItem";
            this.退出ToolStripMenuItem.Size = new System.Drawing.Size(180, 22);
            this.退出ToolStripMenuItem.Text = "退出";
            // 
            // 设置ToolStripMenuItem
            // 
            this.设置ToolStripMenuItem.Name = "设置ToolStripMenuItem";
            this.设置ToolStripMenuItem.Size = new System.Drawing.Size(44, 21);
            this.设置ToolStripMenuItem.Text = "设置";
            // 
            // toolStripMenuItem1
            // 
            this.toolStripMenuItem1.Name = "toolStripMenuItem1";
            this.toolStripMenuItem1.Size = new System.Drawing.Size(180, 22);
            this.toolStripMenuItem1.Text = "新建";
            // 
            // rb_normal
            // 
            this.rb_normal.AutoSize = true;
            this.rb_normal.Location = new System.Drawing.Point(275, 55);
            this.rb_normal.Name = "rb_normal";
            this.rb_normal.Size = new System.Drawing.Size(47, 16);
            this.rb_normal.TabIndex = 6;
            this.rb_normal.TabStop = true;
            this.rb_normal.Text = "普通";
            this.rb_normal.UseVisualStyleBackColor = true;
            // 
            // rb_occlude
            // 
            this.rb_occlude.AutoSize = true;
            this.rb_occlude.Location = new System.Drawing.Point(343, 55);
            this.rb_occlude.Name = "rb_occlude";
            this.rb_occlude.Size = new System.Drawing.Size(47, 16);
            this.rb_occlude.TabIndex = 7;
            this.rb_occlude.TabStop = true;
            this.rb_occlude.Text = "遮挡";
            this.rb_occlude.UseVisualStyleBackColor = true;
            // 
            // rb_obstacle
            // 
            this.rb_obstacle.AutoSize = true;
            this.rb_obstacle.Location = new System.Drawing.Point(411, 55);
            this.rb_obstacle.Name = "rb_obstacle";
            this.rb_obstacle.Size = new System.Drawing.Size(47, 16);
            this.rb_obstacle.TabIndex = 8;
            this.rb_obstacle.TabStop = true;
            this.rb_obstacle.Text = "阻碍";
            this.rb_obstacle.UseVisualStyleBackColor = true;
            // 
            // rb_fill
            // 
            this.rb_fill.AutoSize = true;
            this.rb_fill.Location = new System.Drawing.Point(479, 55);
            this.rb_fill.Name = "rb_fill";
            this.rb_fill.Size = new System.Drawing.Size(47, 16);
            this.rb_fill.TabIndex = 9;
            this.rb_fill.TabStop = true;
            this.rb_fill.Text = "填充";
            this.rb_fill.UseVisualStyleBackColor = true;
            // 
            // MapEditor
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 12F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(800, 450);
            this.Controls.Add(this.rb_fill);
            this.Controls.Add(this.rb_obstacle);
            this.Controls.Add(this.rb_occlude);
            this.Controls.Add(this.rb_normal);
            this.Controls.Add(this.groupBox1);
            this.Controls.Add(this.menuStrip1);
            this.MainMenuStrip = this.menuStrip1;
            this.Name = "MapEditor";
            this.Text = "MapEditor";
            this.Paint += new System.Windows.Forms.PaintEventHandler(this.MapEditor_Paint);
            this.MouseClick += new System.Windows.Forms.MouseEventHandler(this.MapEditor_MouseClick);
            this.MouseMove += new System.Windows.Forms.MouseEventHandler(this.MapEditor_MouseMove);
            this.Resize += new System.EventHandler(this.MapEditor_Resize);
            this.groupBox1.ResumeLayout(false);
            this.groupBox1.PerformLayout();
            this.menuStrip1.ResumeLayout(false);
            this.menuStrip1.PerformLayout();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.TextBox tb_tile_width;
        private System.Windows.Forms.TextBox tb_tile_height;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.GroupBox groupBox1;
        private System.Windows.Forms.MenuStrip menuStrip1;
        private System.Windows.Forms.ToolStripMenuItem 文件ToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem 打开ToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem 保存ToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem 另存为ToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem 退出ToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem 设置ToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem toolStripMenuItem1;
        private System.Windows.Forms.RadioButton rb_normal;
        private System.Windows.Forms.RadioButton rb_occlude;
        private System.Windows.Forms.RadioButton rb_obstacle;
        private System.Windows.Forms.RadioButton rb_fill;
    }
}