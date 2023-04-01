namespace MapEditor.Forms
{
    partial class SpritesheetDialog
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
            this.ButtonOpenFolder = new System.Windows.Forms.Button();
            this.label1 = new System.Windows.Forms.Label();
            this.textBoxDir = new System.Windows.Forms.TextBox();
            this.label2 = new System.Windows.Forms.Label();
            this.textBox1 = new System.Windows.Forms.TextBox();
            this.ButtonMake = new System.Windows.Forms.Button();
            this.SuspendLayout();
            // 
            // ButtonOpenFolder
            // 
            this.ButtonOpenFolder.Location = new System.Drawing.Point(509, 21);
            this.ButtonOpenFolder.Name = "ButtonOpenFolder";
            this.ButtonOpenFolder.Size = new System.Drawing.Size(75, 23);
            this.ButtonOpenFolder.TabIndex = 0;
            this.ButtonOpenFolder.Text = "打开文件夹";
            this.ButtonOpenFolder.UseVisualStyleBackColor = true;
            this.ButtonOpenFolder.Click += new System.EventHandler(this.ButtonOpenFolder_Click);
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Location = new System.Drawing.Point(48, 26);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(65, 12);
            this.label1.TabIndex = 1;
            this.label1.Text = "选择目录：";
            // 
            // textBoxDir
            // 
            this.textBoxDir.Location = new System.Drawing.Point(119, 23);
            this.textBoxDir.Name = "textBoxDir";
            this.textBoxDir.Size = new System.Drawing.Size(373, 21);
            this.textBoxDir.TabIndex = 2;
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Location = new System.Drawing.Point(48, 64);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(65, 12);
            this.label2.TabIndex = 3;
            this.label2.Text = "保存目录：";
            // 
            // textBox1
            // 
            this.textBox1.Location = new System.Drawing.Point(119, 61);
            this.textBox1.Name = "textBox1";
            this.textBox1.Size = new System.Drawing.Size(373, 21);
            this.textBox1.TabIndex = 4;
            // 
            // ButtonMake
            // 
            this.ButtonMake.Location = new System.Drawing.Point(339, 268);
            this.ButtonMake.Name = "ButtonMake";
            this.ButtonMake.Size = new System.Drawing.Size(75, 23);
            this.ButtonMake.TabIndex = 5;
            this.ButtonMake.Text = "制作雪碧图";
            this.ButtonMake.UseVisualStyleBackColor = true;
            this.ButtonMake.Click += new System.EventHandler(this.ButtonMake_Click);
            // 
            // SpritesheetDialog
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 12F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(800, 450);
            this.Controls.Add(this.ButtonMake);
            this.Controls.Add(this.textBox1);
            this.Controls.Add(this.label2);
            this.Controls.Add(this.textBoxDir);
            this.Controls.Add(this.label1);
            this.Controls.Add(this.ButtonOpenFolder);
            this.Name = "SpritesheetDialog";
            this.Text = "Spritesheet";
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.Button ButtonOpenFolder;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.TextBox textBoxDir;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.TextBox textBox1;
        private System.Windows.Forms.Button ButtonMake;
    }
}